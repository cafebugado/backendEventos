import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty({
    description: 'Unique identifier of the event',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2026',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Annual technology conference with workshops and talks',
  })
  description: string;

  @ApiProperty({
    description: 'Location where the event will take place',
    example: 'São Paulo, Brazil',
  })
  location: string;

  @ApiProperty({
    description: 'Date and time when the event starts',
    example: '2026-03-15T09:00:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 500,
  })
  capacity: number;

  @ApiProperty({
    description: 'Whether the event is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Date when the event was created',
    example: '2026-01-29T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the event was last updated',
    example: '2026-01-29T10:00:00.000Z',
  })
  updatedAt: Date;
}
