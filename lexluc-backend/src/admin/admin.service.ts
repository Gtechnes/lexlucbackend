import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    // Access the mock data arrays through the prisma service
    const prisma = this.prisma as any;
    const services = prisma.services || [];
    const tours = prisma.tours || [];
    const bookings = prisma.bookings || [];
    const blogPosts = prisma.blogPosts || [];
    const contacts = prisma.contacts || [];
    const users = prisma.users || [];

    return {
      users: users.length,
      services: services.length,
      tours: tours.length,
      bookings: bookings.length,
      posts: blogPosts.length,
      unreadContacts: contacts.filter((c: any) => c.status === 'NEW').length,
    };
  }
}