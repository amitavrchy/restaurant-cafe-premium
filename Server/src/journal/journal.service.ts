import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJournalDto } from './dto/journal.dto.js';

@Injectable()
export class JournalService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.journalPost.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.journalPost.findUnique({ where: { slug } });
    if (!post || !post.publishedAt) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  create(dto: CreateJournalDto) {
    return this.prisma.journalPost.create({
      data: {
        ...dto,
        publishedAt: new Date(),
      },
    });
  }
}
