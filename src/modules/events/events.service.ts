import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './entities/event.entity';
import { FindAllEventsDto } from './dto/find-all-events.dto';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';
import { EventStatsDto } from './dto/event-stats.dto';

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
      search,
      periodo,
    } = query;
    let eventsToProcess = this.events;

    if (search) {
      const termoBusca = search.toLowerCase();
      eventsToProcess = eventsToProcess.filter((event) => {
        const matchName =
          event.name && event.name.toLowerCase().includes(termoBusca);
        const matchDesc =
          event.description &&
          event.description.toLowerCase().includes(termoBusca);
        return matchName || matchDesc;
      });
    }

    if (periodo) {
      eventsToProcess = eventsToProcess.filter((event) => {
        const hora = new Date(event.date).getHours();

        if (periodo === 'matutino') return hora >= 6 && hora < 12;
        if (periodo === 'vespertino') return hora >= 12 && hora < 18;
        if (periodo === 'noturno') return hora >= 18 || hora < 6;

        return true;
      });
    }

    const sortedEvents = [...eventsToProcess].sort((a, b) => {
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

  getStats(): EventStatsDto {
    return this.events.reduce(
      (stats, event) => {
        const periodo = this.getPeriodFromDate(event.date);

        stats.total += 1;
        stats[periodo] += 1;

        return stats;
      },
      { total: 0, matutino: 0, vespertino: 0, noturno: 0 },
    );
  }

  private getPeriodFromDate(date: Date): 'matutino' | 'vespertino' | 'noturno' {
    const hora = new Date(date).getHours();

    if (hora >= 6 && hora < 12) return 'matutino';
    if (hora >= 12 && hora < 18) return 'vespertino';
    return 'noturno';
  }
}
