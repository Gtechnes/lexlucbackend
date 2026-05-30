'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetch, useMutation, useToast } from '@/lib/hooks';
import { servicesAPI } from '@/lib/api';
import { Service } from '@/types';
import { Button, Input, Badge, Modal } from '@/components/common/UI';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUpload } from '@/components/common/ImageUpload';
import { ChevronUp, ChevronDown, Edit, Trash2, Eye, EyeOff, Search, Plus, X } from 'lucide-react';

const serviceIcons = ['🏨', '🌾', '⛏️', '🛢️', '🎉', '🚚', '🏢', '🌍', '💼', '📊', '🔧', '📦'];

export default function AdminServicesPage() {
  const { data: servicesData, loading, refetch } = useFetch(() => servicesAPI.getAll());
  const services = Array.isArray(servicesData) ? servicesData : [];
  const { success, error: showError } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [previewService, setPreviewService] = useState<Service | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    icon: '',
    image: '',
    order: 0,
    isActive: true,
    features: [''],
    ctaText: 'Learn More',
    ctaLink: '/contact',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
    metaTitle: '',
    metaDescription: '',
  });

  const createMutation = useMutation<Service, typeof formData>((data) => servicesAPI.create(data as any));
  const updateMutation = useMutation<Service, Partial<typeof formData>>(async (data) => {
    if (!editingId) throw new Error('No service ID');
    return servicesAPI.update(editingId, data as any);
  });

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'active' && service.isActive) ||
                           (filterStatus === 'inactive' && !service.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [services, searchQuery, filterStatus]);

  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length,
    published: services.filter(s => s.status === 'PUBLISHED').length,
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      content: '',
      icon: '',
      image: '',
      order: services.length,
      isActive: true,
      features: [''],
      ctaText: 'Learn More',
      ctaLink: '/contact',
      status: 'DRAFT',
      metaTitle: '',
      metaDescription: '',
    });
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description,
      content: service.content || '',
      icon: service.icon || '',
      image: service.image || '',
      order: service.order || 0,
      isActive: service.isActive,
      features: service.features?.length ? service.features : [''],
      ctaText: service.ctaText || 'Learn More',
      ctaLink: service.ctaLink || '/contact',
      status: (service.status || 'DRAFT') as 'DRAFT' | 'PUBLISHED',
      metaTitle: service.metaTitle || '',
      metaDescription: service.metaDescription || '',
    });
    setShowModal(true);
  };

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
  const removeFeature = (idx: number) => setFormData({ 
    ...formData, 
    features: formData.features.filter((_, i) => i !== idx) 
  });
  const updateFeature = (idx: number, value: string) => setFormData({
    ...formData,
    features: formData.features.map((f, i) => i === idx ? value : f),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showError('Service name is required');
      return;
    }

    if (!formData.description.trim()) {
      showError('Description is required');
      return;
    }

    if (!formData.slug.trim()) {
      setFormData({ ...formData, slug: generateSlug(formData.name) });
    }

    const submitData = {
      ...formData,
      features: formData.features.filter(f => f.trim()),
    };

    try {
      if (editingId) {
        await updateMutation.mutate(submitData);
        success('Service updated successfully');
      } else {
        await createMutation.mutate(submitData);
        success('Service created successfully');
      }
      setShowModal(false);
      refetch();
    } catch (err: any) {
      showError(err.message || 'Failed to save service');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesAPI.delete(id);
      success('Service deleted successfully');
      refetch();
    } catch (err: any) {
      showError(err.message || 'Failed to delete service');
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const service = services.find(s => s.id === id);
    if (!service) return;

    const currentIndex = services.indexOf(service);
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= services.length) return;

    const swapService = services[swapIndex];
    try {
      await servicesAPI.update(service.id, { order: swapService.order });
      await servicesAPI.update(swapService.id, { order: service.order });
      refetch();
    } catch (err: any) {
      showError(err.message || 'Failed to reorder services');
    }
  };

  const handleToggleStatus = async (service: Service) => {
    try {
      await servicesAPI.update(service.id, { isActive: !service.isActive });
      success(`Service ${!service.isActive ? 'activated' : 'deactivated'} successfully`);
      refetch();
    } catch (err: any) {
      showError(err.message || 'Failed to update service status');
    }
  };

  const renderPreview = (service: Service) => (
    <div className="max-h-[70vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
      {service.image && (
        <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      <p className="text-gray-600 mb-4">{service.description}</p>
      {(service.features && service.features.length > 0) && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside space-y-1">
            {service.features!.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: service.content || '' }} className="prose" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Services</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active Services</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          <div className="text-sm text-gray-600">Inactive Services</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">{stats.published}</div>
          <div className="text-sm text-gray-600">Published</div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'primary' : 'ghost'}
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />)}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Service</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Order</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {service.icon && <span className="text-2xl">{service.icon}</span>}
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{service.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={service.isActive ? 'success' : 'default'}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span>{service.order}</span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleReorder(service.id, 'up')}
                          disabled={index === 0}
                          className="disabled:opacity-30"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleReorder(service.id, 'down')}
                          disabled={index === filteredServices.length - 1}
                          className="disabled:opacity-30"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => setPreviewService(service)}
                      className="text-gray-600 hover:text-gray-800"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(service)}
                      className={service.isActive ? 'text-green-600' : 'text-gray-400'}
                      title={service.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {service.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? 'Edit Service' : 'Add Service'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
          <Input
            label="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
            required
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Icon</option>
                {serviceIcons.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            <Input
              label="Order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            />
          </div>

          <ImageUpload
            label="Service Image"
            type="service"
            preview={formData.image}
            onUpload={(url) => setFormData({ ...formData, image: url })}
          />

          <Input
            label="Short Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div>
            <label className="block text-sm font-semibold mb-1">Full Content</label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Service detailed content..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Features</label>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(idx, e.target.value)}
                    placeholder={`Feature ${idx + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeFeature(idx)}
                    disabled={formData.features.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="ghost" onClick={addFeature}>
                + Add Feature
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="CTA Button Text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            />
            <Input
              label="CTA Link"
              value={formData.ctaLink}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <span className="text-sm font-medium">Active</span>
          </label>

          <Input
            label="Meta Title"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          />
          <Input
            label="Meta Description"
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          />
        </form>
        <div className="flex gap-2 mt-6">
          <Button
            loading={createMutation.loading || updateMutation.loading}
            onClick={handleSubmit}
            className="flex-1"
          >
            {editingId ? 'Update' : 'Create'}
          </Button>
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={!!previewService}
        onClose={() => setPreviewService(null)}
        title="Service Preview"
        size="xl"
      >
        {previewService && renderPreview(previewService)}
      </Modal>
    </div>
  );
}