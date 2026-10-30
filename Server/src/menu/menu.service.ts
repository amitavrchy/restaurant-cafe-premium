import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateItemDto,
  CreateSectionDto,
  UpdateItemDto,
  UpdateSectionDto,
} from './dto/menu.dto.js';

function parseDietary(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenu() {
    const sections = await this.prisma.menuSection.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        items: {
          where: { available: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        dietary: parseDietary(item.dietary),
      })),
    }));
  }

  createSection(dto: CreateSectionDto) {
    return this.prisma.menuSection.create({ data: dto });
  }

  async updateSection(id: string, dto: UpdateSectionDto) {
    await this.ensureSection(id);
    return this.prisma.menuSection.update({ where: { id }, data: dto });
  }

  async deleteSection(id: string) {
    await this.ensureSection(id);
    return this.prisma.menuSection.delete({ where: { id } });
  }

  createItem(dto: CreateItemDto) {
    const { dietary, ...rest } = dto;
    return this.prisma.menuItem.create({
      data: {
        ...rest,
        dietary: JSON.stringify(dietary ?? []),
      },
    });
  }

  async updateItem(id: string, dto: UpdateItemDto) {
    await this.ensureItem(id);
    const { dietary, ...rest } = dto;
    return this.prisma.menuItem.update({
      where: { id },
      data: {
        ...rest,
        ...(dietary !== undefined
          ? { dietary: JSON.stringify(dietary) }
          : {}),
      },
    });
  }

  async deleteItem(id: string) {
    await this.ensureItem(id);
    return this.prisma.menuItem.delete({ where: { id } });
  }

  private async ensureSection(id: string) {
    const section = await this.prisma.menuSection.findUnique({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
  }

  private async ensureItem(id: string) {
    const item = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
  }
}
