import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(createContactMessageDto: any) {
    return (this.prisma as any).contactMessage.create({ data: createContactMessageDto });
  }

  findAll(page?: string, limit?: string) {
    return (this.prisma as any).contactMessage.findMany() as any;
  }

  findOne(id: string) {
    return (this.prisma as any).contactMessage.findUnique({ where: { id } }) as any;
  }

  markAsRead(id: string) {
    return (this.prisma as any).contactMessage.update({ where: { id }, data: { status: 'READ' } });
  }

  respond(id: string, response: string) {
    return (this.prisma as any).contactMessage.update({
      where: { id },
      data: { status: 'RESPONDED', response, respondedAt: new Date() },
    });
  }

  remove(id: string) {
    return (this.prisma as any).contactMessage.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}