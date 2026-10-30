import { Module } from '@nestjs/common';
import { ClosuresController } from './closures.controller.js';
import { ClosuresService } from './closures.service.js';

@Module({
  controllers: [ClosuresController],
  providers: [ClosuresService],
})
export class ClosuresModule {}
