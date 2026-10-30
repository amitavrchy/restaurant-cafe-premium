import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInquiryDto } from './dto/create-inquiry.dto.js';

@Injectable()
export class PrivateInquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateInquiryDto) {
    return this.prisma.privateInquiry.create({
      data: {
        name: dto.name,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        eventDate: dto.eventDate
          ? new Date(`${dto.eventDate}T00:00:00.000Z`)
          : null,
        guests: dto.guests,
        message: dto.message,
      },
    });
  }

  findAll() {
    return this.prisma.privateInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
