import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  private logger = new Logger('BlogService');

  constructor(private prisma: PrismaService) {}

  create(createBlogPostDto: any) {
    this.logger.log(`Creating blog post: title="${createBlogPostDto.title}"`);
    return (this.prisma as any).blogPost.create({ data: createBlogPostDto });
  }

  async findAllPublic(page?: string, limit?: string, categoryId?: string) {
    this.logger.debug(`Fetching public posts, categoryId=${categoryId}`);
    return (this.prisma as any).blogPost.findMany() as any;
  }

  async findAllAdmin(page?: string, limit?: string) {
    this.logger.debug('Fetching admin posts');
    return (this.prisma as any).blogPost.findMany() as any;
  }

  findOne(id: string) {
    return (this.prisma as any).blogPost.findUnique({ where: { id } }) as any;
  }

  findBySlug(slug: string) {
    return (this.prisma as any).blogPost.findUnique({ where: { slug } }) as any;
  }

  update(id: string, updateBlogPostDto: any) {
    this.logger.log(`Updating blog post: id="${id}"`);
    return (this.prisma as any).blogPost.update({ where: { id }, data: updateBlogPostDto });
  }

  remove(id: string) {
    return (this.prisma as any).blogPost.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}