import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './entities/event.entity';
import { FindAllEventsDto } from './dto/find-all-events.dto';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    const event: Event = {
      id: randomUUID(),
      name: createEventDto.name,
      description: createEventDto.description,
      location: createEventDto.location,
      date: new Date(createEventDto.date),
      capacity: createEventDto.capacity,
      isActive: createEventDto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.events.push(event);
    return event;
  }

  findAll(query: FindAllEventsDto = {}): PaginatedResult<Event> {
    const {
      page = 1,
      limit = 9,
      sort = 'date',
      order = 'asc',
      isActive,
      location,
      dateFrom,
      dateTo
    } = query;

    let filteredEvents = this.events;

    if (isActive !== undefined) {
      filteredEvents = filteredEvents.filter(e => e.isActive === isActive);
    }

    if (location) {
      const searchLoc = location.toLowerCase();
      filteredEvents = filteredEvents.filter(e =>
        e.location?.toLowerCase().includes(searchLoc)
      );
    }

    if (dateFrom) {
      filteredEvents = filteredEvents.filter(e => new Date(e.date) >= dateFrom);
    }
    if (dateTo) {
      filteredEvents = filteredEvents.filter(e => new Date(e.date) <= dateTo);
    }

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      const valueA = a[sort];
      const valueB = b[sort];

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    const total = sortedEvents.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = sortedEvents.slice(startIndex, endIndex);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  findOne(id: string): Event {
    const event = this.events.find((e) => e.id === id);
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  update(id: string, updateEventDto: UpdateEventDto): Event {
    const eventIndex = this.events.findIndex((e) => e.id === id);
    if (eventIndex === -1) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    const existingEvent = this.events[eventIndex];
    const updatedEvent: Event = {
      ...existingEvent,
      ...updateEventDto,
      date: updateEventDto.date
        ? new Date(updateEventDto.date)
        : existingEvent.date,
      updatedAt: new Date(),
    };

    this.events[eventIndex] = updatedEvent;
    return updatedEvent;
  }

  remove(id: string): void {
    const eventIndex = this.events.findIndex((e) => e.id === id);
    if (eventIndex === -1) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    this.events.splice(eventIndex, 1);
  }
}
