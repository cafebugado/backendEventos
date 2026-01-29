import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2026',
    maxLength: 255,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Annual technology conference with workshops and talks',
    maxLength: 1000,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'Location where the event will take place',
    example: 'São Paulo, Brazil',
    maxLength: 255,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  location?: string;

  @ApiProperty({
    description: 'Date and time when the event starts (ISO 8601 format)',
    example: '2026-03-15T09:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 500,
    minimum: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiProperty({
    description: 'Whether the event is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
