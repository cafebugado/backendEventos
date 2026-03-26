import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './entities/event.entity';
import { FindAllEventsDto } from './dto/find-all-events.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  create(@Body() createEventDto: CreateEventDto): Event {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all events with optional filters and sorting',
  })
  @ApiQuery({
    name: 'sort',
    enum: ['date', 'name', 'createdAt'],
    description: 'Sort field for the results',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    enum: ['asc', 'desc'],
    description: 'Sort order for the results',
    required: false,
  })
  @ApiQuery({
    name: 'isActive',
    type: Boolean,
    description: 'Filter events by active status',
    required: false,
  })
  @ApiQuery({
    name: 'location',
    type: String,
    description: 'Filter events by location (case-insensitive partial match)',
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    description: 'Filter events starting from this date (ISO 8601 format)',
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    description: 'Filter events until this date (ISO 8601 format)',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered and sorted events',
    type: [Event],
  })
  findAll(@Query() query: FindAllEventsDto) {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiParam({
    name: 'id',
    description: 'Event UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'The event with the specified ID',
    type: Event,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Event {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace an event completely' })
  @ApiParam({
    name: 'id',
    description: 'Event UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  replace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Event {
    return this.eventsService.update(id, updateEventDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event partially' })
  @ApiParam({
    name: 'id',
    description: 'Event UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully updated.',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Event {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({
    name: 'id',
    description: 'Event UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 204,
    description: 'The event has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.eventsService.remove(id);
  }
}
