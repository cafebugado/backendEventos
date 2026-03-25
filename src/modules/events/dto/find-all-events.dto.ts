<<<<<<< HEAD
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
import { Transform, Type } from 'class-transformer';
=======
import { IsBoolean, IsDate, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
>>>>>>> developer

export class FindAllEventsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination (starts from 1)',
    example: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
<<<<<<< HEAD
  @Transform(({ value }: { value: unknown }) => {
    if (value === undefined || value === null || value === '') return 1;
    const num = Number(value);
    return isNaN(num) || num < 1 ? 1 : Math.floor(num);
  })
=======
  @Type(() => Number)
>>>>>>> developer
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
<<<<<<< HEAD
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Filter events by active status. Accept: true, false, 1, 0',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      if (value === 'true' || value === '1') return true;
      if (value === 'false' || value === '0') return false;
    }
    return undefined;
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filter events by location (case-insensitive partial match)',
    example: 'São Paulo',
  })
=======
  order?: 'asc' | 'desc' = 'asc';
  
  @ApiPropertyOptional({ description: 'Filtrar por status (true/false)' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true') 
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Filtrar por local' })
>>>>>>> developer
  @IsOptional()
  @IsString()
  location?: string;

<<<<<<< HEAD
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
=======
  @ApiPropertyOptional({ description: 'Data inicial (DD/MM/AAAA)' })
  @IsOptional()
  @Transform(({ value }) => {

    if (value && typeof value === 'string') {
      const [dia, mes, ano] = value.split('/');
      return new Date(`${ano}-${mes}-${dia}`);
    }
    return value as unknown;
  })
  @IsDate()
  dateFrom?: Date;

  @ApiPropertyOptional({ description: 'Data final (DD/MM/AAAA)' })
  @IsOptional()
  @Transform(({ value }) => {

    if (value && typeof value === 'string') {
      const [dia, mes, ano] = value.split('/');
      return new Date(`${ano}-${mes}-${dia}`);
    }
    return value as unknown;
  })
  @IsDate()
  dateTo?: Date;
}
>>>>>>> developer
