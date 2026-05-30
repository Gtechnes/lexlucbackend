'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFetch } from '@/lib/hooks';
import { servicesAPI } from '@/lib/api';
import { Loader, Button } from '@/components/common/UI';
import { ArrowLeft } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { data: service, loading, error } = useFetch(() => servicesAPI.getBySlug(slug));

  if (loading) return <Loader />;

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button variant="ghost">Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasFeatures = service.features && service.features.length > 0;
  const ctaText = service.ctaText || 'Get Started';
  const ctaLink = service.ctaLink || '/contact';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
              {service.icon && <span className="text-6xl">{service.icon}</span>}
              <h1 className="text-4xl md:text-5xl font-bold">{service.name}</h1>
            </motion.div>
            <motion.p variants={itemVariants} className="text-xl text-blue-100 max-w-3xl">
              {service.description}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              {service.image && (
                <motion.div variants={itemVariants} className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </motion.div>
              )}

              {service.content && (
                <motion.div
                  variants={itemVariants}
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              )}
            </div>

            <motion.div variants={itemVariants} className="space-y-6">
              {hasFeatures && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features!.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-500 text-lg mt-0.5">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Contact us to learn more about this service and how we can help you.
                </p>
                <Link href={ctaLink}>
                  <Button className="w-full bg-white text-blue-900 hover:bg-gray-100">
                    {ctaText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}