import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateJournalDto {
  @IsString()
  slug!: string;

  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  @MinLength(10)
  body!: string;

  @IsOptional()
  @IsString()
  coverImage?: string;
}
