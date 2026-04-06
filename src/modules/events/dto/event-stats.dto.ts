import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class EventStatsDto {
  @ApiProperty({ description: 'Total de eventos cadastrados', example: 10 })
  @IsInt()
  @Min(0)
  readonly total: number;

  @ApiProperty({
    description: 'Quantidade de eventos no período da manhã (06:00 - 11:59)',
    example: 3,
  })
  @IsInt()
  @Min(0)
  readonly matutino: number;

  @ApiProperty({
    description: 'Quantidade de eventos no período da tarde (12:00 - 17:59)',
    example: 3,
  })
  @IsInt()
  @Min(0)
  readonly vespertino: number;

  @ApiProperty({
    description:
      'Quantidade de eventos no período da noite/madrugada (18:00 - 05:59)',
    example: 4,
  })
  @IsInt()
  @Min(0)
  readonly noturno: number;
}
