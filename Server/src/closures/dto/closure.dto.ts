import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateClosureDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date!: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateClosureDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date?: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
