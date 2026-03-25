import {
  IsIn,
  IsOptional,
  IsString,
  IsBoolean,
  IsISO8601,
  IsInt,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindAllEventsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination (starts from 1)',
    example: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === undefined || value === null || value === '') return 1;
    const num = Number(value);
    return isNaN(num) || num < 1 ? 1 : Math.floor(num);
  })
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 9,
    minimum: 1,
    maximum: 50,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === undefined || value === null || value === '') return 9;
    const num = Number(value);
    return isNaN(num) || num < 1 ? 9 : Math.min(Math.floor(num), 50);
  })
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 9;

  @IsOptional()
  @IsString()
  @IsIn(['date', 'name', 'createdAt'])
  sort?: 'date' | 'name' | 'createdAt' = 'date';

  @ApiPropertyOptional({
    description: 'Sort order for the results',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional({
    description: 'Filter events by active status',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filter events by location (case-insensitive partial match)',
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Filter events starting from this date (ISO 8601 format)',
    example: '2026-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter events until this date (ISO 8601 format)',
    example: '2026-12-31T23:59:59.999Z',
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
