'use client';

import { useState } from 'react';
import { useFetch, useToast } from '@/lib/hooks';
import { blogAPI, categoriesAPI } from '@/lib/api';
import { clearCache } from '@/lib/api';
import { BlogPost, BlogCategory } from '@/types';
import { Button, Card, Badge } from '@/components/common/UI';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Modal } from '@/components/common/UI';
import { generateSlug, ensureSlug } from '@/lib/slug';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function AdminBlogPage() {
  const { data: postsData, loading, refetch } = useFetch(() => blogAPI.getAdmin());
  const { data: categoriesData } = useFetch(() => categoriesAPI.getAll());
  const posts = Array.isArray(postsData) ? postsData : [];
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  const { success: showSuccess, error: showError } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    image: '',
    categoryId: '' as string | undefined,
    content: '',
    isPublished: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showError('Blog title is required');
      return;
    }

    if (!formData.content.trim()) {
      showError('Content is required');
      return;
    }

    const postData = {
      title: formData.title,
      slug: ensureSlug(formData.slug, formData.title),
      content: formData.content,
      excerpt: formData.excerpt,
      image: formData.image || undefined,
      categoryId: formData.categoryId,
      isPublished: formData.isPublished,
    };

    try {
      if (editingId) {
        await blogAPI.update(editingId, postData);
        showSuccess('Post updated successfully');
      } else {
        await blogAPI.create(postData);
        showSuccess('Post created successfully');
      }
      setShowModal(false);
      clearCache();
      refetch();
    } catch (err: any) {
      showError(err.message || 'Failed to save post');
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      setUploadingImage(true);
      const originalSizeMB = (file.size / 1024 / 1024).toFixed(2);
      console.log(`Uploading image: ${originalSizeMB}MB`);
      const url = await uploadToCloudinary(file, 'blog');
      console.log('Uploaded image URL:', url);
      return url;
    } catch (error: any) {
      console.error('Image upload failed:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      image: '',
      categoryId: '',
      content: '',
      isPublished: false,
    });
    setShowModal(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      image: post.image || '',
      categoryId: post.categoryId || '',
      content: post.content,
      isPublished: post.isPublished,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await blogAPI.delete(id);
      showSuccess('Post deleted successfully');
      refetch();
    } catch (err: any) {
      showError(err.message || 'Failed to delete post');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600 mt-1">Create and manage your blog content</p>
          </div>
          <Button onClick={handleAdd}>+ New Post</Button>
        </div>
      </header>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-24 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
          <p className="text-gray-600 mb-6">Start creating engaging content for your audience</p>
          <Button onClick={handleAdd}>Create Your First Post</Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post: any) => (
            <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                    {post.category && (
                      <Badge variant="info" className="text-xs">{post.category.name}</Badge>
                    )}
                    <Badge 
                      variant={post.isPublished ? 'success' : 'warning'} 
                      className="text-xs"
                    >
                      {post.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full max-w-md h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                  </p>
                  
                  <div className="text-xs text-gray-500">
                    {post.publishedAt
                      ? `Published: ${new Date(post.publishedAt).toLocaleDateString()}`
                      : `Created: ${new Date(post.createdAt).toLocaleDateString()}`}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          <div className="flex items-center gap-2">
            {editingId ? 'Edit Post' : 'New Blog Post'}
            {formData.isPublished && (
              <Badge variant="success" className="text-xs">Published</Badge>
            )}
          </div>
        }
        actions={
          <div className="flex gap-3 w-full">
            <Button
              variant="ghost"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="blog-form"
              className="flex-1"
            >
              {editingId ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        }
      >
        <form id="blog-form" onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                const newSlug = !formData.slug ? generateSlug(title) : formData.slug;
                setFormData({ ...formData, title, slug: newSlug });
              }}
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
          </div>

          {/* Blog Subtitle/Summary */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Blog Subtitle / Summary
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A brief summary or subtitle that appears in listings..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value || undefined })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select a category...</option>
              {categories.map((cat: BlogCategory) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Featured Image
            </label>
            <div className="space-y-3">
              {formData.image && (
                <div className="relative inline-block">
                  <img
                    src={formData.image}
                    alt="Featured"
                    className="max-w-md h-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              )}
<label 
  className="inline-block"
>
  <input
    type="file"
    accept="image/jpeg,image/png,image/gif,image/webp"
    onChange={async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const originalSizeMB = (file.size / 1024 / 1024).toFixed(2);
          if (file.size > 5 * 1024 * 1024) {
            showError(`Image too large (${originalSizeMB}MB). Compressing automatically...`);
          }
          const url = await handleImageUpload(file);
          setFormData({ ...formData, image: url });
        } catch (error: any) {
          showError(error.message || 'Upload failed. Please try another image.');
        }
      }
    }}
    className="hidden"
    disabled={uploadingImage}
  />
  <span 
    className={`px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 cursor-pointer inline-block ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {formData.image ? 'Change Image' : uploadingImage ? 'Uploading...' : 'Upload Featured Image'}
  </span>
</label>
            </div>
          </div>

          {/* Main Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Main Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              onImageUpload={handleImageUpload}
              minHeight="400px"
              placeholder="Start writing your blog post..."
            />
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-5 h-5"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 cursor-pointer">
              Publish this post
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
}