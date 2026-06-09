import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(private prisma: PrismaService) {}

  create(createServiceDto: any) {
    this.logger.log(`Creating service: ${createServiceDto.name}`);
    return (this.prisma as any).service.create({
      data: createServiceDto,
    });
  }

  findAll(page?: string, limit?: string) {
    this.logger.log('Fetching all services');
    return (this.prisma as any).service.findMany({
      where: { deletedAt: null },
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: string) {
    return (this.prisma as any).service.findUnique({ where: { id } });
  }

  findBySlug(slug: string) {
    return (this.prisma as any).service.findUnique({ where: { slug } });
  }

  async update(id: string, updateServiceDto: any) {
    this.logger.log(`Updating service ${id}`);
    return (this.prisma as any).service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: string) {
    this.logger.log(`Soft deleting service ${id}`);
    return (this.prisma as any).service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}