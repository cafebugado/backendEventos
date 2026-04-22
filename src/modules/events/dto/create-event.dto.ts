import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2026',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Annual technology conference with workshops and talks',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: 'Location where the event will take place',
    example: 'São Paulo, Brazil',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @ApiProperty({
    description: 'Date and time when the event starts (ISO 8601 format)',
    example: '2026-03-15T09:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 500,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Period of the event',
    example: 'noturno',
    enum: ['matutino', 'vespertino', 'noturno'],
  })
  @IsEnum(['matutino', 'vespertino', 'noturno'], {
    message: 'Period must be matutino, vespertino or noturno',
  })
  @IsNotEmpty()
  period: string;

  @ApiProperty({
    description: 'Whether the event is active',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
