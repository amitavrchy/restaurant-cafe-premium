import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreateJournalDto } from './dto/journal.dto.js';
import { JournalService } from './journal.service.js';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  findAll() {
    return this.journalService.findPublished();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.journalService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateJournalDto) {
    return this.journalService.create(dto);
  }
}
