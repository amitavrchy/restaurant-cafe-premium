import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreateInquiryDto } from './dto/create-inquiry.dto.js';
import { PrivateInquiriesService } from './private-inquiries.service.js';

@Controller('private-inquiries')
export class PrivateInquiriesController {
  constructor(private readonly service: PrivateInquiriesService) {}

  @Post()
  create(@Body() dto: CreateInquiryDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.service.findAll();
  }
}
