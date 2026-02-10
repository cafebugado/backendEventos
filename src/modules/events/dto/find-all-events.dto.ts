import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllEventsDto {
  @IsOptional()
  @Type(() => Number) // Garante que "1" vire o número 1
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50) // Proteção contra sobrecarga
  limit?: number = 9;

  @IsOptional()
  @IsString()
  @IsIn(['date', 'name', 'createdAt'])
  sort?: 'date' | 'name' | 'createdAt' = 'date';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
}