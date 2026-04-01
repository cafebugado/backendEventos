import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type, Transform, TransformFnParams } from 'class-transformer';
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

  @ApiPropertyOptional({ description: 'Busca eventos por termo ou descrição' })
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
