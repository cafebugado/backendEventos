import { ApiProperty } from '@nestjs/swagger';
export class EventStatsDto {
    
    @ApiProperty({ description: 'Total de eventos cadastrados', example: 10 })
    total: number;
    @ApiProperty({ description: 'Quantidade de eventos no período da manhã (06:00 - 11:59)', example: 3 })
    matutino: number;
    @ApiProperty({ description: 'Quantidade de eventos no período da tarde (12:00 - 17:59)', example: 3 })
    vespertino: number;
    @ApiProperty({ description: 'Quantidade de eventos no período da noite/madrugada (18:00 - 05:59)', example: 4 })
    noturno: number;
}