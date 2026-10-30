import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClosureDto, UpdateClosureDto } from './dto/closure.dto.js';

@Injectable()
export class ClosuresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.closure.findMany({ orderBy: { date: 'asc' } });
  }

  create(dto: CreateClosureDto) {
    return this.prisma.closure.create({
      data: {
        date: new Date(`${dto.date}T00:00:00.000Z`),
        reason: dto.reason,
      },
    });
  }

  async update(id: string, dto: UpdateClosureDto) {
    await this.ensure(id);
    return this.prisma.closure.update({
      where: { id },
      data: {
        ...(dto.date ? { date: new Date(`${dto.date}T00:00:00.000Z`) } : {}),
        ...(dto.reason !== undefined ? { reason: dto.reason } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.ensure(id);
    return this.prisma.closure.delete({ where: { id } });
  }

  private async ensure(id: string) {
    const row = await this.prisma.closure.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Closure not found');
  }
}
