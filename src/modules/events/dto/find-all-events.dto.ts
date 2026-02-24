import { IsBoolean, IsDate, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllEventsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 9;

  @IsOptional()
  @IsString()
  @IsIn(['date', 'name', 'createdAt'])
  sort?: 'date' | 'name' | 'createdAt' = 'date';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';
  
  @ApiPropertyOptional({ description: 'Filtrar por status (true/false)' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true') 
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Filtrar por local' })
  @IsOptional()
  @IsString()
  location?: string;

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