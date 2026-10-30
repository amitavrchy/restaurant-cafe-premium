import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ClosuresModule } from './closures/closures.module.js';
import { JournalModule } from './journal/journal.module.js';
import { MenuModule } from './menu/menu.module.js';
import { PrivateInquiriesModule } from './private-inquiries/private-inquiries.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ReservationsModule } from './reservations/reservations.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    MenuModule,
    ReservationsModule,
    PrivateInquiriesModule,
    ClosuresModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
