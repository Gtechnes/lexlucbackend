'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'facebook':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.236.195 2.236.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.549 0 11.675-6.254 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.176 8.176 0 01-2.165-.58a4.118 4.118 0 001.9-.62 8.145 8.145 0 01-2.49-.87v.056a4.076 4.076 0 01.22-.22 4.1 4.1 0 01-1.313.41 4.107 4.107 0 00-6.99.46A11.65 11.65 0 013 5.17a4.107 4.107 0 011.327 5.56A1.936 1.936 0 012 10.28v.36a4.096 4.096 0 00.829 1.66 4.1 4.1 0 01-1.853.39 4.1 4.1 0 01-.388-.034 4.1 4.1 0 001.497-.88 8.25 8.25 0 01-5.33-4.01 8.25 8.25 0 011.937-.56 4.072 4.072 0 011.936.34A11.62 11.62 0 0020.27 4.55 11.62 11.62 0 004.55 16.3 12.62 12.62 0 01-5.65 1.42v.083c0 1.78 1.26 3.22 2.96 3.26" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.523c0-1.3-.028-2.981-1.792-2.981-1.792 0-2.017 1.405-2.017 2.891v5.626h-3.554V9h3.414v1.561h.047c.477-.9 1.637-1.845 3.368-1.845 3.6 0 4.267 2.37 4.267 5.454v6.276zM5.337 7.433c-1.144 0-2.067-.925-2.067-2.067s.923-2.067 2.067-2.067c1.143 0 2.067.925 2.067 2.067s-.924 2.067-2.067 2.067zm1.777 13.019H3.558V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.257 24 24 23.227 24 22.271V1.729C24 .774 23.257 0 22.222 0z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.242 1.305 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.243-3.608 1.305-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.242-1.305-3.608C2.175 15.747 2.163 15.467 2.163 12.163s.012-3.584.07-4.85c.062-1.366.33-2.633 1.305-3.608.975-.975 2.242-1.243 3.608-1.305C7.58 2.175 7.96 2.163 12 2.163z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-12 h-12 lg:w-14 lg:h-14"
              >
                <Image
                  src="/logo.png"
                  alt="Lexluc Global Services"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 56px"
                />
              </motion.div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lexluc Global
              </span>
            </div>

            <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-6 max-w-sm">
              Excellence in Tourism, Agriculture, Mining, Oil & Gas, Recreation, Transportation & Logistics.
              Your trusted partner for global services and premium tours.
            </p>

            <div className="space-y-3 text-sm">
              {CONTACT_INFO.phoneDisplay.map((display, index) => (
                <motion.a
                  key={display}
                  href={`https://wa.me/${CONTACT_INFO.phones[index]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="text-gray-400 flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} className="text-blue-400" />
                  {display}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${CONTACT_INFO.email}`}
                whileHover={{ x: 5 }}
                className="text-gray-400 flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Mail size={16} className="text-blue-400" />
                {CONTACT_INFO.email}
              </motion.a>
              <motion.a
                href={CONTACT_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="text-gray-400 flex items-start gap-2 hover:text-blue-400 transition-colors"
              >
                <MapPin size={16} className="text-blue-400 mt-1" />
                <span className="leading-tight">{CONTACT_INFO.address}</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative text-gray-400 hover:text-white transition-colors inline-block">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 w-0 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative text-gray-400 hover:text-white transition-colors inline-block">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 w-0 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-white font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative text-gray-400 hover:text-white transition-colors inline-block">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-blue-400 transition-all duration-300 w-0 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <h5 className="text-white font-medium mb-3">Connect With Us</h5>
              <div className="flex gap-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                    aria-label={platform}
                  >
                    <SocialIcon platform={platform} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="border-t border-gray-800 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Lexluc Global Services and Tours Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-500">{CONTACT_INFO.hours}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}