import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL! ;
  const adminPasswordRaw = process.env.ADMIN_PASSWORD!;
  const adminPassword = await bcrypt.hash(adminPasswordRaw, 10);
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample services with all 6 categories
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'tourism-hospitality' },
      update: {},
      create: {
        name: 'Tourism & Hospitality',
        slug: 'tourism-hospitality',
        description: 'Comprehensive tourism and hospitality solutions for unforgettable experiences',
        content: '<h2>End-to-End Tourism & Hospitality Services</h2><p>We provide premium tourism and hospitality services tailored to meet your travel needs. Our expert team handles everything from tour planning to post-trip support.</p><h3>Why Choose Us?</h3><ul><li>Personalized travel experiences</li><li>Global network of partners</li><li>24/7 customer support</li><li>Competitive pricing</li></ul>',
        icon: '🏨',
        order: 1,
        status: 'PUBLISHED',
        isActive: true,
        features: [
          'Tour planning and packaging',
          'International and local travel arrangements',
          'Hotel reservations and hospitality services',
          'Corporate and group travel coordination',
          'Tourism consultancy and destination management',
        ],
        ctaText: 'Plan Your Journey',
        ctaLink: '/contact',
        metaTitle: 'Tourism & Hospitality Services | Lexluc Global',
        metaDescription: 'Expert tour planning, hotel reservations, and travel arrangements. Corporate and group travel coordination with 24/7 support.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'agriculture' },
      update: {},
      create: {
        name: 'Agriculture',
        slug: 'agriculture',
        description: 'Complete agricultural solutions from farm to market',
        content: '<h2>Comprehensive Agricultural Services</h2><p>Our agriculture division provides end-to-end solutions for modern farming, from equipment sourcing to value chain optimization.</p><h3>Our Expertise</h3><p>We work with farmers, agribusinesses, and agricultural cooperatives to improve productivity and profitability.</p>',
        icon: '🌾',
        order: 2,
        status: 'PUBLISHED',
        isActive: true,
        features: [
          'Agro-products supply and distribution',
          'Crop farming and animal husbandry',
          'Agricultural equipment sourcing',
          'Agro-processing and value-chain services',
          'Farm management and consultancy',
        ],
        ctaText: 'Grow With Us',
        ctaLink: '/contact',
        metaTitle: 'Agriculture Services | Lexluc Global',
        metaDescription: 'Agro-products supply, crop farming, equipment sourcing, and farm management consultancy for sustainable agriculture.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'mining-solid-minerals' },
      update: {},
      create: {
        name: 'Mining & Solid Minerals',
        slug: 'mining-solid-minerals',
        description: 'Professional mining services with environmental responsibility',
        content: '<h2>Mining & Solid Minerals Solutions</h2><p>We provide comprehensive mining services with strict adherence to environmental and regulatory standards.</p><h3>Our Services Include</h3><p>From exploration to distribution, we handle all aspects of solid mineral operations.</p>',
        icon: '⛏️',
        order: 3,
        status: 'PUBLISHED',
        isActive: true,
        features: [
          'Exploration and supply of solid minerals',
          'Mining consultancy and support operations',
          'Mineral sourcing, trading, and logistics',
          'Environmental and regulatory compliance support',
        ],
        ctaText: 'Explore Opportunities',
        ctaLink: '/contact',
        metaTitle: 'Mining & Solid Minerals Services | Lexluc Global',
        metaDescription: 'Exploration, mining consultancy, mineral trading, and environmental compliance support for the mining industry.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'oil-gas-services' },
      update: {},
      create: {
        name: 'Oil & Gas Services',
        slug: 'oil-gas-services',
        description: 'Complete upstream and downstream oil and gas solutions',
        content: '<h2>Oil & Gas Services</h2><p>Our comprehensive oil and gas services cover the entire value chain from exploration to distribution.</p><h3>Full-Service Solutions</h3><p>We provide reliable, safe, and efficient services to the oil and gas industry.</p>',
        icon: '🛢️',
        order: 4,
        status: 'PUBLISHED',
        isActive: true,
        features: [
          'Upstream and downstream logistics',
          'Supply of petroleum products (diesel, PMS, gas, etc.)',
          'Equipment procurement and servicing',
          'Oilfield support and consultancy',
          'Pipeline and facility maintenance partnerships',
        ],
        ctaText: 'Get Fuel Solutions',
        ctaLink: '/contact',
        metaTitle: 'Oil & Gas Services | Lexluc Global',
        metaDescription: 'Upstream/downstream logistics, petroleum supply, equipment procurement, and oilfield maintenance services.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'recreation-events' },
      update: {},
      create: {
        name: 'Recreation & Events',
        slug: 'recreation-events',
        description: 'Memorable events and recreational experiences',
        content: '<h2>Recreation & Events Management</h2><p>We create unforgettable experiences through expert event planning and recreational facility management.</p><h3>Event Excellence</h3><p>From corporate retreats to large-scale entertainment, we handle every detail.</p>',
        icon: '🎉',
        order: 5,
        status: 'PUBLISHED',
        isActive: true,
        features: [
          'Event planning and management',
          'Recreational facility management',
          'Corporate retreats and leisure activities',
          'Entertainment service coordination',
        ],
        ctaText: 'Plan Your Event',
        ctaLink: '/contact',
        metaTitle: 'Recreation & Events Services | Lexluc Global',
        metaDescription: 'Event planning, recreational facility management, corporate retreats, and entertainment coordination services.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'transportation-logistics' },
      update: {},
      create: {
        name: 'Transportation & Logistics',
        slug: 'transportation-logistics',
        description: 'Reliable transport and logistics solutions for all your needs',
        content: '<h2>Transportation & Logistics Services</h2><p>Our comprehensive transport solutions ensure your goods and passengers reach their destination safely and on time.</p><h3>End-to-End Logistics</h3><p>We provide integrated logistics services across multiple transportation modes.</p>',
        icon: '🚛',
        order: 6,
        status: 'PUBLISHED',
        isActive: true,
        features: [
          'Road transport services (passenger & cargo)',
          'Vehicle rentals (fleet management)',
          'Logistics and supply-chain management',
          'Freight handling and delivery services',
          'Airport pickup and travel transport solutions',
        ],
        ctaText: 'Request Transport',
        ctaLink: '/contact',
        metaTitle: 'Transportation & Logistics Services | Lexluc Global',
        metaDescription: 'Road transport, vehicle rentals, supply chain management, freight handling, and airport pickup services.',
      },
    }),
  ]);

  console.log('✅ Created', services.length, 'services');

  // Create sample tours
  const tours = await Promise.all([
    prisma.tour.upsert({
      where: { slug: 'safari-adventure' },
      update: {},
      create: {
        title: 'Safari Adventure',
        slug: 'safari-adventure',
        description: 'Experience the wild in Nigeria\'s most beautiful safari destinations',
        destination: 'Yankari National Park',
        duration: 5,
        price: 1500,
        maxParticipants: 20,
        isActive: true,
        highlights: ['Wildlife viewing', 'Hot springs', 'Local village visit', 'Professional guides'],
        inclusions: ['Accommodation', 'Meals', 'Transportation', 'Guide services'],
        exclusions: ['Travel insurance', 'Personal expenses'],
        metaTitle: 'Safari Adventure Tour',
        metaDescription: 'Experience Nigerian wildlife on our guided safari adventure',
        serviceId: services[0].id,
      },
    }),
  ]);

  console.log('✅ Created', tours.length, 'tours');

  console.log('✨ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
