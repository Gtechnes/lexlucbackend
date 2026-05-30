import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  create(createBookingDto: any) {
    return (this.prisma as any).booking.create({ data: createBookingDto });
  }

  findAll(page?: string, limit?: string) {
    const pageNum = parseInt(page || '1', 10);
    const limitNum = parseInt(limit || '10', 10);
    const skip = (pageNum - 1) * limitNum;

    if (!page && !limit) {
      return (this.prisma as any).booking.findMany() as any;
    }

    return (this.prisma as any).booking.findMany() as any;
  }

  findOne(id: string) {
    return (this.prisma as any).booking.findUnique({ where: { id } }) as any;
  }

  findByReference(referenceNo: string) {
    return (this.prisma as any).booking.findUnique({ where: { referenceNo } }) as any;
  }

  updateStatus(id: string, status: string) {
    return (this.prisma as any).booking.update({
      where: { id },
      data: { status },
    }) as any;
  }

  remove(id: string) {
    return (this.prisma as any).booking.delete({ where: { id } });
  }
}