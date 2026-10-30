import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateSectionDto {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;

  @IsNumber()
  @Min(0)
  sortOrder!: number;
}

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}

export class CreateItemDto {
  @IsString()
  sectionId!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsArray()
  @IsString({ each: true })
  dietary!: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  sectionId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietary?: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
