'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { contactsAPI } from '@/lib/api';
import { Input, Textarea, Button } from '@/components/common/UI';
import { useToast } from '@/lib/hooks';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactPage() {
  const { success, error: showError } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);
      await contactsAPI.create(formData);
      setSubmitted(true);
      success('Message sent successfully! We will get back to you soon.');
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      showError((err as Error)?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out through any channel below and our team will respond promptly.
          </p>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-20">
            {CONTACT_INFO.phoneDisplay.map((phone, index) => (
              <motion.a
                key={`whatsapp-${index}`}
                href={`https://wa.me/${CONTACT_INFO.phones[index]}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="block"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16 0C7.163 0 0 6.843 0 15.349c0 4.782 1.96 9.158 5.247 12.177L0 32l8.087-3.565c2.55 1.211 5.517 1.874 8.913 1.874 8.836 0 16-6.843 16-15.349S24.837 0 16 0zm0 29.077c-2.55 0-5.1-.407-7.513-1.143l-.534-.187-4.822 2.077 1.354-5.094-.157-.511C5.077 20.385 4 17.958 4 15.349c0-1.495.021-2.982.06-4.462C5.77 20.268 10.603 23.077 16 23.077s10.23-2.809 11.94-7.122l.06 4.462c0 7.642-5.444 13.717-12 13.717z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">WhatsApp</h3>
                  <p className="text-gray-600 font-medium">{phone}</p>
                </div>
              </motion.a>
            ))}

            <motion.a
              href={`mailto:${CONTACT_INFO.email}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="block"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600 font-medium">{CONTACT_INFO.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={CONTACT_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="block"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600 font-medium text-sm leading-tight">{CONTACT_INFO.address}</p>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">Fill the form below and we&apos;ll get back to you within 24 hours</p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                </div>

                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  required
                />

                <Textarea
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full relative overflow-hidden"
                  >
                    {submitted ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={20} />
                        Message Sent!
                      </motion.span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send size={18} />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}