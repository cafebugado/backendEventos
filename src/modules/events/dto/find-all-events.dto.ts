import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type, Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllEventsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination (starts from 1)',
    example: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
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
  @Transform(({ value }: { value: unknown }) => {
  @Transform(({ value }) => {
    if (value === 'true' || value === '1' || value === 1) return true;
    if (value === 'false' || value === '0' || value === 0) return false;
    if (typeof value === 'boolean') return value;
    return undefined;
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filter events by location (case-insensitive partial match)',
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams): string => {
    return typeof value === 'string' ? value.trim() : String(value);
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtra eventos pelo período do dia',
    enum: ['matutino', 'vespertino', 'noturno'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['matutino', 'vespertino', 'noturno'], {
    message: 'Período inválido. Use: matutino, vespertino ou noturno',
  })
  periodo?: 'matutino' | 'vespertino' | 'noturno';
}
