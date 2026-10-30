import { Module } from '@nestjs/common';
import { PrivateInquiriesController } from './private-inquiries.controller.js';
import { PrivateInquiriesService } from './private-inquiries.service.js';

@Module({
  controllers: [PrivateInquiriesController],
  providers: [PrivateInquiriesService],
})
export class PrivateInquiriesModule {}
