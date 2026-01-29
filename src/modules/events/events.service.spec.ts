import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto';

describe('EventsService', () => {
  let service: EventsService;

  const createEventDto: CreateEventDto = {
    name: 'Test Event',
    description: 'Test Description',
    location: 'Test Location',
    date: '2026-03-15T09:00:00.000Z',
    capacity: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', () => {
      const event = service.create(createEventDto);

      expect(event).toBeDefined();
      expect(event.id).toBeDefined();
      expect(event.name).toBe(createEventDto.name);
      expect(event.description).toBe(createEventDto.description);
      expect(event.location).toBe(createEventDto.location);
      expect(event.capacity).toBe(createEventDto.capacity);
      expect(event.isActive).toBe(true);
      expect(event.createdAt).toBeInstanceOf(Date);
      expect(event.updatedAt).toBeInstanceOf(Date);
    });

    it('should create an event with isActive false', () => {
      const event = service.create({ ...createEventDto, isActive: false });

      expect(event.isActive).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return an empty array initially', () => {
      const events = service.findAll();

      expect(events).toEqual([]);
    });

    it('should return all created events', () => {
      service.create(createEventDto);
      service.create({ ...createEventDto, name: 'Second Event' });

      const events = service.findAll();

      expect(events).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return an event by id', () => {
      const createdEvent = service.create(createEventDto);

      const foundEvent = service.findOne(createdEvent.id);

      expect(foundEvent).toEqual(createdEvent);
    });

    it('should throw NotFoundException for non-existent event', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an event', () => {
      const createdEvent = service.create(createEventDto);
      const updateDto = { name: 'Updated Name' };

      const updatedEvent = service.update(createdEvent.id, updateDto);

      expect(updatedEvent.name).toBe('Updated Name');
      expect(updatedEvent.description).toBe(createEventDto.description);
    });

    it('should update event date', () => {
      const createdEvent = service.create(createEventDto);
      const newDate = '2026-06-20T10:00:00.000Z';

      const updatedEvent = service.update(createdEvent.id, { date: newDate });

      expect(updatedEvent.date).toEqual(new Date(newDate));
    });

    it('should throw NotFoundException for non-existent event', () => {
      expect(() =>
        service.update('non-existent-id', { name: 'Updated' }),
      ).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an event', () => {
      const createdEvent = service.create(createEventDto);

      service.remove(createdEvent.id);

      expect(() => service.findOne(createdEvent.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException for non-existent event', () => {
      expect(() => service.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });
});
