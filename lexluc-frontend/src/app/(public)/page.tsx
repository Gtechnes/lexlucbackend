import { Metadata } from 'next';
import Link from 'next/link';
import HeroSlider from '@/components/home/HeroSlider';
import AnimatedStats from '@/components/home/AnimatedStats';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Home | Lexluc Global Services and Tours Limited',
  description: SITE_CONFIG.description,
  openGraph: {
    title: 'Lexluc Global Services and Tours Limited',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <AnimatedStats />

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Tourism', 'Agriculture', 'Mining'].map((service) => (
              <div
                key={service}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <p className="text-gray-600 mb-4">
                  Professional services tailored to your business needs
                </p>
                <Link
                  href={`/services#${service.toLowerCase()}`}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Tours & Destinations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Safari Adventure', 'City Exploration', 'Beach Getaway'].map((tour) => (
              <div key={tour} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-gray-300 h-48 flex items-center justify-center text-4xl">
                  ✈️
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tour}</h3>
                  <p className="text-gray-600 mb-4">
                    Unforgettable experiences with professional guides and premium accommodations
                  </p>
                  <Link
                    href={`/tours#${tour.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tours"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your travel or business needs. Our team is ready to help!
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
}
