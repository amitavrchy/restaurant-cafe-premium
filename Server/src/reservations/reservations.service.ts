import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation.dto.js';

function parseDateOnly(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailability(dateStr: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      throw new BadRequestException('date must be YYYY-MM-DD');
    }

    const date = parseDateOnly(dateStr);
    const closure = await this.prisma.closure.findFirst({ where: { date } });
    if (closure) {
      return {
        date: dateStr,
        closed: true,
        reason: closure.reason,
        slots: [],
      };
    }

    const periods = await this.prisma.servicePeriod.findMany({
      orderBy: { startTime: 'asc' },
    });

    const activeStatuses: ReservationStatus[] = [
      ReservationStatus.PENDING,
      ReservationStatus.CONFIRMED,
    ];

    const reservations = await this.prisma.reservation.findMany({
      where: {
        date,
        status: { in: activeStatuses },
      },
    });

    const slots = periods.flatMap((period) => {
      const start = timeToMinutes(period.startTime);
      const end = timeToMinutes(period.endTime);
      const result: Array<{
        time: string;
        period: string;
        maxCovers: number;
        booked: number;
        remaining: number;
        available: boolean;
      }> = [];

      for (let t = start; t < end; t += period.slotMinutes) {
        const time = minutesToTime(t);
        const booked = reservations
          .filter((r) => r.time === time)
          .reduce((sum, r) => sum + r.partySize, 0);
        const remaining = Math.max(0, period.maxCovers - booked);
        result.push({
          time,
          period: period.name,
          maxCovers: period.maxCovers,
          booked,
          remaining,
          available: remaining > 0,
        });
      }
      return result;
    });

    return { date: dateStr, closed: false, reason: null, slots };
  }

  async create(dto: CreateReservationDto) {
    const availability = await this.getAvailability(dto.date);
    if (availability.closed) {
      throw new BadRequestException(
        availability.reason ?? 'Restaurant is closed on this date',
      );
    }

    const slot = availability.slots.find((s) => s.time === dto.time);
    if (!slot) {
      throw new BadRequestException('Invalid time slot');
    }
    if (slot.remaining < dto.partySize) {
      throw new BadRequestException(
        `Not enough capacity. Remaining covers: ${slot.remaining}`,
      );
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        date: parseDateOnly(dto.date),
        time: dto.time,
        partySize: dto.partySize,
        name: dto.name,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        notes: dto.notes,
        seating: dto.seating,
        status: ReservationStatus.CONFIRMED,
      },
    });

    // Email confirmation stub
    console.log(
      `[email-stub] Reservation confirmed ${reservation.code} → ${reservation.email} on ${dto.date} at ${dto.time} for ${dto.partySize}`,
    );

    return reservation;
  }

  findAll() {
    return this.prisma.reservation.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
  }

  async update(id: string, dto: UpdateReservationDto) {
    const existing = await this.prisma.reservation.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Reservation not found');
    return this.prisma.reservation.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}
