import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the database');
    process.exit(1);
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordRaw = process.env.ADMIN_PASSWORD;
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

  console.log('Created admin user:', admin.email);

  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'tourism-hospitality' },
      update: {},
      create: {
        name: 'Tourism & Hospitality',
        slug: 'tourism-hospitality',
        description: 'Comprehensive tourism and hospitality solutions for unforgettable experiences',
        content: '<h2>End-to-End Tourism & Hospitality Services</h2><p>We provide premium tourism and hospitality services tailored to meet your travel needs.</p>',
        icon: 'Hotel',
        order: 1,
        status: 'PUBLISHED',
        isActive: true,
        features: ['Tour planning and packaging', 'Hotel reservations', 'Corporate travel coordination'],
        ctaText: 'Plan Your Journey',
        ctaLink: '/contact',
        metaTitle: 'Tourism & Hospitality Services | Lexluc Global',
        metaDescription: 'Expert tour planning, hotel reservations, and travel arrangements.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'agriculture' },
      update: {},
      create: {
        name: 'Agriculture',
        slug: 'agriculture',
        description: 'Complete agricultural solutions from farm to market',
        content: '<h2>Comprehensive Agricultural Services</h2><p>Modern farming, equipment sourcing, and value chain optimization.</p>',
        icon: 'Sprout',
        order: 2,
        status: 'PUBLISHED',
        isActive: true,
        features: ['Agro-products supply', 'Crop farming', 'Farm management'],
        ctaText: 'Grow With Us',
        ctaLink: '/contact',
        metaTitle: 'Agriculture Services | Lexluc Global',
        metaDescription: 'Agro-products supply, crop farming, and farm management consultancy.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'mining-solid-minerals' },
      update: {},
      create: {
        name: 'Mining & Solid Minerals',
        slug: 'mining-solid-minerals',
        description: 'Professional mining services with environmental responsibility',
        content: '<h2>Mining & Solid Minerals Solutions</h2><p>Exploration, extraction, logistics, and environmental compliance support.</p>',
        icon: 'Pickaxe',
        order: 3,
        status: 'PUBLISHED',
        isActive: true,
        features: ['Mineral exploration', 'Mining consultancy', 'Logistics'],
        ctaText: 'Explore Opportunities',
        ctaLink: '/contact',
        metaTitle: 'Mining & Solid Minerals Services | Lexluc Global',
        metaDescription: 'Exploration, mining consultancy, and mineral trading services.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'oil-gas-services' },
      update: {},
      create: {
        name: 'Oil & Gas Services',
        slug: 'oil-gas-services',
        description: 'Complete upstream and downstream oil and gas solutions',
        content: '<h2>Oil & Gas Services</h2><p>Reliable services across the oil and gas value chain.</p>',
        icon: 'Fuel',
        order: 4,
        status: 'PUBLISHED',
        isActive: true,
        features: ['Upstream logistics', 'Petroleum supply', 'Oilfield support'],
        ctaText: 'Get Fuel Solutions',
        ctaLink: '/contact',
        metaTitle: 'Oil & Gas Services | Lexluc Global',
        metaDescription: 'Oil and gas logistics, petroleum supply, and oilfield maintenance services.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'recreation-events' },
      update: {},
      create: {
        name: 'Recreation & Events',
        slug: 'recreation-events',
        description: 'Memorable events and recreational experiences',
        content: '<h2>Recreation & Events Management</h2><p>Expert event planning and recreational facility management.</p>',
        icon: 'PartyPopper',
        order: 5,
        status: 'PUBLISHED',
        isActive: true,
        features: ['Event planning', 'Corporate retreats', 'Recreation coordination'],
        ctaText: 'Plan Your Event',
        ctaLink: '/contact',
        metaTitle: 'Recreation & Events Services | Lexluc Global',
        metaDescription: 'Event planning, recreational facility management, and corporate retreats.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'transportation-logistics' },
      update: {},
      create: {
        name: 'Transportation & Logistics',
        slug: 'transportation-logistics',
        description: 'Reliable transport and logistics solutions for all your needs',
        content: '<h2>Transportation & Logistics Services</h2><p>Integrated logistics services across multiple transportation modes.</p>',
        icon: 'Truck',
        order: 6,
        status: 'PUBLISHED',
        isActive: true,
        features: ['Road transport', 'Vehicle rentals', 'Freight handling'],
        ctaText: 'Request Transport',
        ctaLink: '/contact',
        metaTitle: 'Transportation & Logistics Services | Lexluc Global',
        metaDescription: 'Road transport, vehicle rentals, freight handling, and airport pickup services.',
      },
    }),
  ]);

  console.log('Created', services.length, 'services');

  const tourismService = services[0];

  await prisma.tour.upsert({
    where: { slug: 'kenya-safari-adventure' },
    update: {},
    create: {
      title: 'Kenya Safari Adventure',
      slug: 'kenya-safari-adventure',
      category: 'Adventure',
      destination: 'Kenya',
      departureLocation: 'Lagos, Nigeria',
      shortDescription: 'A 7-day luxury safari through Kenya\'s most iconic national parks',
      description: 'Experience the breathtaking wildlife of Kenya with guided game drives through the Maasai Mara, luxury lodge stays, and authentic cultural encounters.',
      startDate: new Date('2025-08-15'),
      endDate: new Date('2025-08-22'),
      status: 'PUBLISHED',
      price: 4500,
      currency: 'NGN',
      availableSlots: 8,
      discount: 0,
      featured: true,
      featuredImage: 'https://images.unsplash.com/photo-1516426122078-ca296fbf827a?q=80&w=1920&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1516426122078-ca296fbf827a?q=80&w=800',
        'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800',
        'https://images.unsplash.com/photo-1501706362039-c06b2d715385?q=80&w=800',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Nairobi', description: 'Airport pickup and transfer to hotel' },
        { day: 2, title: 'Nairobi to Maasai Mara', description: 'Road transfer with en-route game drive' },
        { day: 3, title: 'Maasai Mara Full Day', description: 'Morning and afternoon game drives' },
        { day: 4, title: 'Hot Air Balloon Safari', description: 'Sunrise balloon ride followed by bush breakfast' },
        { day: 5, title: 'Maasai Village Visit', description: 'Cultural experience with local Maasai community' },
        { day: 6, title: 'Last Game Drive', description: 'Final morning game drive before departure' },
        { day: 7, title: 'Return to Nairobi', description: 'Departure transfer to airport' },
      ],
      inclusions: ['Luxury accommodation', 'All meals', 'Game drives', 'Airport transfers', 'Professional guide', 'Park entrance fees'],
      exclusions: ['International flights', 'Travel insurance', 'Personal expenses', 'Visa fees'],
      highlights: ['Maasai Mara Game Reserve', 'Big Five Safari', 'Hot Air Balloon Ride', 'Bush Dinner Experience'],
      duration: 7,
      maxParticipants: 16,
      seoTitle: 'Kenya Safari Adventure Tour',
      seoDescription: 'Book a guided luxury Kenya safari with Maasai Mara game drives and cultural visits.',
      seoKeywords: 'Kenya safari, Maasai Mara, luxury safari, Africa tour',
      serviceId: tourismService.id,
    },
  });

  await prisma.tour.upsert({
    where: { slug: 'mauritius-island-paradise' },
    update: {},
    create: {
      title: 'Mauritius Island Paradise',
      slug: 'mauritius-island-paradise',
      category: 'Beach',
      destination: 'Mauritius',
      departureLocation: 'Lagos, Nigeria',
      shortDescription: 'A romantic 5-day getaway to the paradise island of Mauritius',
      description: 'Discover the stunning beaches and crystal-clear waters of Mauritius with beachfront resort stays, island tours, and water sports.',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-06'),
      status: 'PUBLISHED',
      price: 6800,
      currency: 'NGN',
      availableSlots: 14,
      discount: 10,
      featured: false,
      featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800',
        'https://images.unsplash.com/photo-1540539236735-38a6dc7e59ba?q=80&w=800',
        'https://images.unsplash.com/photo-1507525424809-3bf92a6378e0?q=80&w=800',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Mauritius', description: 'Welcome at airport and check-in to resort' },
        { day: 2, title: 'Island Discovery', description: 'Full-day sightseeing tour of the island' },
        { day: 3, title: 'Catamaran Cruise', description: 'Full-day cruise to Ile Aux Cerfs' },
        { day: 4, title: 'Relaxation Day', description: 'Spa treatment and beach activities' },
        { day: 5, title: 'Departure', description: 'Check-out and transfer to airport' },
      ],
      inclusions: ['Beachfront resort', 'All meals', 'Catamaran cruise', 'Airport transfers', 'City tour', 'Water sports'],
      exclusions: ['International flights', 'Travel insurance', 'Diving activities', 'Personal expenses'],
      highlights: ['Le Morne Beach', 'Seven Colored Earths', 'Chamarel Waterfalls', 'Catamaran Cruise'],
      duration: 5,
      maxParticipants: 20,
      seoTitle: 'Mauritius Island Paradise Tour',
      seoDescription: 'Book a romantic Mauritius beach holiday with resort stays and island tours.',
      seoKeywords: 'Mauritius tour, beach holiday, island tour, Africa travel',
      serviceId: tourismService.id,
    },
  });

  await prisma.tour.upsert({
    where: { slug: 'dubai-luxury-experience' },
    update: {},
    create: {
      title: 'Dubai Luxury Experience',
      slug: 'dubai-luxury-experience',
      category: 'Luxury',
      destination: 'Dubai, UAE',
      departureLocation: 'Lagos, Nigeria',
      shortDescription: 'Experience ultra-luxury in the jewel of the Middle East',
      description: 'Explore the opulence and modern marvels of Dubai with 5-star stays, Burj Khalifa access, desert safari, and dhow cruise dinner.',
      startDate: new Date('2026-05-20'),
      endDate: new Date('2026-06-25'),
      status: 'PUBLISHED',
      price: 8500,
      currency: 'NGN',
      availableSlots: 8,
      discount: 0,
      featured: true,
      featuredImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800',
        'https://images.unsplash.com/photo-1536591158134-3bb4c3a8d1df?q=80&w=800',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Dubai', description: 'Airport pickup and hotel check-in' },
        { day: 2, title: 'Dubai City Tour', description: 'Visit Burj Khalifa, Dubai Mall, and Marina' },
        { day: 3, title: 'Desert Safari', description: 'Evening desert adventure with BBQ dinner' },
        { day: 4, title: 'Abu Dhabi Tour', description: 'Visit Sheikh Zayed Grand Mosque' },
        { day: 5, title: 'Leisure Day', description: 'Optional activities and shopping' },
        { day: 6, title: 'Departure', description: 'Transfer to airport' },
      ],
      inclusions: ['5-star hotel', 'Breakfast', 'Desert safari', 'City tour', 'Dhow cruise dinner', 'Guide'],
      exclusions: ['International flights', 'Visa fees', 'Shopping', 'Personal expenses'],
      highlights: ['Burj Khalifa', 'Dubai Mall', 'Desert Safari', 'Dhow Cruise', 'Palm Jumeirah'],
      duration: 6,
      maxParticipants: 12,
      seoTitle: 'Dubai Luxury Experience Tour',
      seoDescription: 'Book a luxury Dubai tour with 5-star hotels, desert safari, and city experiences.',
      seoKeywords: 'Dubai tour, luxury travel, UAE tour, Dubai safari',
      serviceId: tourismService.id,
    },
  });

  await prisma.tour.upsert({
    where: { slug: 'riverside-agritourism-experience' },
    update: {},
    create: {
      title: 'Riverside Agritourism Experience',
      slug: 'riverside-agritourism-experience',
      category: 'Agritourism',
      destination: 'Ogun State, Nigeria',
      departureLocation: 'Lagos, Nigeria',
      shortDescription: 'A 4-day farm-to-table agricultural tour',
      description: 'Immerse yourself in sustainable farming practices with farm stays, crop tours, fish farming workshops, and farm-to-table dining.',
      startDate: new Date('2026-08-15'),
      endDate: new Date('2026-08-19'),
      status: 'PUBLISHED',
      price: 1500,
      currency: 'NGN',
      availableSlots: 20,
      discount: 0,
      featured: true,
      featuredImage: 'https://images.unsplash.com/photo-1500651230702-0e2d8be49d51?q=80&w=1920&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1500651230702-0e2d8be49d51?q=80&w=800',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800',
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800',
      ],
      itinerary: [
        { day: 1, title: 'Arrival & Orientation', description: 'Welcome, farm tour and orientation dinner' },
        { day: 2, title: 'Crop Farming Day', description: 'Hands-on crop planting and harvesting' },
        { day: 3, title: 'Livestock & Fish Farming', description: 'Animal husbandry and fish pond tour' },
        { day: 4, title: 'Farm-to-Table Feast', description: 'Cooking experience using farm produce then departure' },
      ],
      inclusions: ['Farm accommodation', 'All meals from farm', 'Tours and workshops', 'Transport', 'Guides'],
      exclusions: ['Travel insurance', 'Personal expenses', 'Souvenirs'],
      highlights: ['Farm-to-table dining', 'Cocoa plantation tour', 'Fish farming', 'Agricultural workshops'],
      duration: 4,
      maxParticipants: 30,
      seoTitle: 'Riverside Agritourism Experience',
      seoDescription: 'Book a Nigerian agritourism experience with farm stays, workshops, and farm-to-table meals.',
      seoKeywords: 'agritourism, farm tour, Nigeria tourism, sustainable farming',
      serviceId: services[1].id,
    },
  });

  await prisma.tour.upsert({
    where: { slug: 'south-africa-garden-route' },
    update: {},
    create: {
      title: 'South Africa Garden Route',
      slug: 'south-africa-garden-route',
      category: 'Adventure',
      destination: 'South Africa',
      departureLocation: 'Lagos, Nigeria',
      shortDescription: 'Explore one of the world\'s most scenic road trips',
      description: 'A scenic journey along South Africa\'s most beautiful coastal route with Cape Town, winelands, wildlife parks, and coastal towns.',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-03-11'),
      status: 'PUBLISHED',
      price: 7200,
      currency: 'NGN',
      availableSlots: 6,
      discount: 0,
      featured: true,
      featuredImage: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?q=80&w=1920&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?q=80&w=800',
        'https://images.unsplash.com/photo-1547471080-7ccfbca19db4?q=80&w=800',
        'https://images.unsplash.com/photo-1580063522615-15b98af9d5b7?q=80&w=800',
      ],
      itinerary: [
        { day: 1, title: 'Cape Town Arrival', description: 'Airport pickup, hotel check-in, city orientation' },
        { day: 2, title: 'Cape Peninsula', description: 'Cape of Good Hope and penguin colony' },
        { day: 3, title: 'Cape Winelands', description: 'Stellenbosch wine tasting tour' },
        { day: 4, title: 'Hermanus', description: 'Whale watching and coastal exploration' },
        { day: 5, title: 'Route 62', description: 'Scenic drive through Karoo' },
        { day: 6, title: 'Oudtshoorn', description: 'Ostrich farm and Cango Caves' },
        { day: 7, title: 'Knysna', description: 'Elephant park and lagoon cruise' },
        { day: 8, title: 'Tsitsikamma', description: 'Storms River suspension bridge' },
        { day: 9, title: 'Addo Elephant Park', description: 'Full-day wildlife safari' },
        { day: 10, title: 'Departure', description: 'Transfer to Port Elizabeth airport' },
      ],
      inclusions: ['Accommodation', 'Transport in SUV', 'Breakfast & select meals', 'Entry fees', 'Professional guide'],
      exclusions: ['International flights', 'Visa', 'Lunches except where stated', 'Tips and gratuities'],
      highlights: ['Cape of Good Hope', 'Knysna Elephant Park', 'Boulders Beach Penguins', 'Wine Tasting'],
      duration: 10,
      maxParticipants: 12,
      seoTitle: 'South Africa Garden Route Tour',
      seoDescription: 'Book a scenic South Africa Garden Route tour with Cape Town, wildlife, and coastal stops.',
      seoKeywords: 'South Africa tour, Garden Route, Cape Town, safari',
      serviceId: tourismService.id,
    },
  });

  await prisma.tour.upsert({
    where: { slug: 'morocco-desert-escape' },
    update: {},
    create: {
      title: 'Morocco Desert Escape',
      slug: 'morocco-desert-escape',
      category: 'Cultural',
      destination: 'Morocco',
      departureLocation: 'Lagos, Nigeria',
      shortDescription: 'A magical 8-day desert and cultural adventure',
      description: 'Trek through the golden dunes of the Sahara and explore ancient Moroccan cities, markets, mountains, and desert camps.',
      startDate: new Date('2026-09-20'),
      endDate: new Date('2026-09-28'),
      status: 'PUBLISHED',
      price: 5500,
      currency: 'NGN',
      availableSlots: 5,
      discount: 0,
      featured: true,
      featuredImage: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1920&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800',
        'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=800',
        'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800',
      ],
      itinerary: [
        { day: 1, title: 'Arrive Marrakech', description: 'Airport pickup and medina exploration' },
        { day: 2, title: 'Marrakech Sights', description: 'Full-day city tour of palaces, souks, and gardens' },
        { day: 3, title: 'Atlas Mountains', description: 'Drive through High Atlas to Dades Valley' },
        { day: 4, title: 'Dades to Merzouga', description: 'Scenic drive to Sahara desert gateway' },
        { day: 5, title: 'Sahara Desert', description: 'Camel trek into dunes and overnight desert camp' },
        { day: 6, title: 'Desert to Fes', description: 'Journey through Ziz Valley to Fes' },
        { day: 7, title: 'Fes Exploration', description: 'Full day exploring ancient Fes medina' },
        { day: 8, title: 'Departure', description: 'Transfer to Fes airport for onward journey' },
      ],
      inclusions: ['Riad accommodation', 'Some meals', 'Desert camp', 'Camel trek', 'Local guides', 'Transport'],
      exclusions: ['International flights', 'Visa fees', 'Most meals', 'Travel insurance'],
      highlights: ['Sahara Desert Camp', 'Marrakech Medina', 'Atlas Mountains', 'Fes Ancient City', 'Camel Trek'],
      duration: 8,
      maxParticipants: 15,
      seoTitle: 'Morocco Desert Escape Tour',
      seoDescription: 'Book a Morocco desert and cultural tour through Marrakech, Atlas Mountains, Sahara, and Fes.',
      seoKeywords: 'Morocco tour, Sahara desert, Marrakech, cultural travel',
      serviceId: tourismService.id,
    },
  });

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
