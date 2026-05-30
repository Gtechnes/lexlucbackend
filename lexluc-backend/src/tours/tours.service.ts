import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  create(createTourDto: any) {
    return (this.prisma as any).tour.create({ data: createTourDto });
  }

  findAll(page?: string, limit?: string) {
    if (!page && !limit) {
      return (this.prisma as any).tour.findMany() as any;
    }
    return (this.prisma as any).tour.findMany() as any;
  }

  findOne(id: string) {
    return (this.prisma as any).tour.findUnique({ where: { id } }) as any;
  }

  findBySlug(slug: string) {
    return (this.prisma as any).tour.findUnique({ where: { slug } }) as any;
  }

  update(id: string, updateTourDto: any) {
    return (this.prisma as any).tour.update({ where: { id }, data: updateTourDto });
  }

  remove(id: string) {
    return (this.prisma as any).tour.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}