import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClosureDto, UpdateClosureDto } from './dto/closure.dto.js';

function utcDateOnly(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

@Injectable()
export class ClosuresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.closure.findMany({ orderBy: { date: 'asc' } });
  }

  create(dto: CreateClosureDto) {
    return this.prisma.closure.create({
      data: {
        date: utcDateOnly(dto.date),
        reason: dto.reason,
      },
    });
  }

  async update(id: string, dto: UpdateClosureDto) {
    await this.ensure(id);
    return this.prisma.closure.update({
      where: { id },
      data: {
        ...(dto.date ? { date: utcDateOnly(dto.date) } : {}),
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
