import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './entities/event.entity';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  const mockEvent: Event = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Test Event',
    description: 'Test Description',
    location: 'Test Location',
    date: new Date('2026-03-15T09:00:00.000Z'),
    capacity: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createEventDto: CreateEventDto = {
    name: 'Test Event',
    description: 'Test Description',
    location: 'Test Location',
    date: '2026-03-15T09:00:00.000Z',
    capacity: 100,
  };

  const mockEventsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', () => {
      mockEventsService.create.mockReturnValue(mockEvent);

      const result = controller.create(createEventDto);

      expect(result).toEqual(mockEvent);
      expect(service.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', () => {
      mockEventsService.findAll.mockReturnValue([mockEvent]);

      const result = controller.findAll();

      expect(result).toEqual([mockEvent]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return an empty array when no events', () => {
      mockEventsService.findAll.mockReturnValue([]);

      const result = controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an event by id', () => {
      mockEventsService.findOne.mockReturnValue(mockEvent);

      const result = controller.findOne(mockEvent.id);

      expect(result).toEqual(mockEvent);
      expect(service.findOne).toHaveBeenCalledWith(mockEvent.id);
    });

    it('should throw NotFoundException when event not found', () => {
      mockEventsService.findOne.mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('replace (PUT)', () => {
    it('should replace an event', () => {
      const updateDto: UpdateEventDto = { name: 'Updated Event' };
      const updatedEvent = { ...mockEvent, ...updateDto };
      mockEventsService.update.mockReturnValue(updatedEvent);

      const result = controller.replace(mockEvent.id, updateDto);

      expect(result).toEqual(updatedEvent);
      expect(service.update).toHaveBeenCalledWith(mockEvent.id, updateDto);
    });
  });

  describe('update (PATCH)', () => {
    it('should update an event partially', () => {
      const updateDto: UpdateEventDto = { name: 'Updated Event' };
      const updatedEvent = { ...mockEvent, ...updateDto };
      mockEventsService.update.mockReturnValue(updatedEvent);

      const result = controller.update(mockEvent.id, updateDto);

      expect(result).toEqual(updatedEvent);
      expect(service.update).toHaveBeenCalledWith(mockEvent.id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove an event', () => {
      mockEventsService.remove.mockReturnValue(undefined);

      controller.remove(mockEvent.id);

      expect(service.remove).toHaveBeenCalledWith(mockEvent.id);
    });

    it('should throw NotFoundException when event not found', () => {
      mockEventsService.remove.mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });
});
