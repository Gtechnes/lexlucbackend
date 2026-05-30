'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFetch } from '@/lib/hooks';
import { servicesAPI } from '@/lib/api';
import { Loader, Button } from '@/components/common/UI';
import { ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { y: -5, transition: { duration: 0.2 } },
};

export default function ServicesPage() {
  const { data: servicesData, loading, error } = useFetch(() => servicesAPI.getAll());
  const services = Array.isArray(servicesData) ? servicesData.filter(s => s.isActive) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Premium Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive solutions across multiple industries tailored to your business needs
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Loader />}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg text-center"
            >
              Error loading services: {error}
            </motion.div>
          )}

          {!loading && !error && services.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600">No services available at the moment.</p>
            </motion.div>
          )}

          {!loading && !error && services.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {service.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      {service.icon && (
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                      {service.description}
                    </p>

                    {(service.features && service.features.length > 0) && (
                      <ul className="mb-4 space-y-1">
                        {service.features!.slice(0, 3).map((feature, i) => (
                          <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mt-auto group/link"
                    >
                      {service.ctaText || 'Learn More'}
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a customized solution
          </p>
          <Link href="/contact">
            <Button className="bg-white text-blue-900 hover:bg-gray-100">
              Request a Quote
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}