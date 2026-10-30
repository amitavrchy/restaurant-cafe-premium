import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ReservationStatus } from '@prisma/client';

export class CreateReservationDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date!: string;

  @Matches(/^\d{2}:\d{2}$/)
  time!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  partySize!: number;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  seating?: string;
}

export class UpdateReservationDto {
  @IsEnum(ReservationStatus)
  status!: ReservationStatus;
}
