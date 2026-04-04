/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';

interface EventResponse {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let createdEventId: string;
  let accessToken: string;

  const createEventDto = {
    name: 'E2E Test Event',
    description: 'E2E Test Description',
    location: 'E2E Test Location',
    date: '2026-03-15T09:00:00.000Z',
    capacity: 100,
    period: 'noturno',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    const loginResponse = await supertest(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'gaby.gdmc@gmail.com', password: 'cafe7430' });
    accessToken = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/events (POST)', () => {
    it('should create an event', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(createEventDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect((response.body as EventResponse).name).toBe(createEventDto.name);
      expect((response.body as EventResponse).description).toBe(
        createEventDto.description,
      );
      expect((response.body as EventResponse).isActive).toBe(true);

      createdEventId = response.body.id;
    });

    it('should return 400 for invalid data', async () => {
      await supertest(app.getHttpServer())
        .post('/events')
        .send({ name: '' })
        .expect(400);
    });

    it('should return 400 for missing required fields', async () => {
      await supertest(app.getHttpServer())
        .post('/events')
        .send({ name: 'Only Name' })
        .expect(400);
    });
  });

  describe('/events (GET)', () => {
    it('should return all events', async () => {
      const response = await supertest(app.getHttpServer())
        .get('/events')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect((response.body as EventResponse[]).length).toBeGreaterThanOrEqual(
        1,
      );
    });
  });

  describe('/events/:id (GET)', () => {
    it('should return an event by id', async () => {
      const response = await supertest(app.getHttpServer())
        .get(`/events/${createdEventId}`)
        .expect(200);

      expect((response.body as EventResponse).id).toBe(createdEventId);
      expect((response.body as EventResponse).name).toBe(createEventDto.name);
    });

    it('should return 404 for non-existent event', async () => {
      await supertest(app.getHttpServer())
        .get('/events/550e8400-e29b-41d4-a716-446655440000')
        .expect(404);
    });

    it('should return 400 for invalid UUID', async () => {
      await supertest(app.getHttpServer())
        .get('/events/invalid-uuid')
        .expect(400);
    });
  });

  describe('/events/:id (PUT)', () => {
    it('should replace an event', async () => {
      const updateDto = {
        name: 'Updated Event Name',
        description: 'Updated Description',
      };

      const response = await supertest(app.getHttpServer())
        .put(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateDto)
        .expect(200);

      expect((response.body as EventResponse).name).toBe(updateDto.name);
      expect((response.body as EventResponse).description).toBe(
        updateDto.description,
      );
    });

    it('should return 404 for non-existent event', async () => {
      await supertest(app.getHttpServer())
        .put('/events/550e8400-e29b-41d4-a716-446655440000')
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('/events/:id (PATCH)', () => {
    it('should update an event partially', async () => {
      const updateDto = { name: 'Patched Event Name' };

      const response = await supertest(app.getHttpServer())
        .patch(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.name).toBe(updateDto.name);
    });

    it('should return 404 for non-existent event', async () => {
      await supertest(app.getHttpServer())
        .patch('/events/550e8400-e29b-41d4-a716-446655440000')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('/events/:id (DELETE)', () => {
    it('should delete an event', async () => {
      await supertest(app.getHttpServer())
        .delete(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 for non-existent event', async () => {
      await supertest(app.getHttpServer())
        .delete('/events/550e8400-e29b-41d4-a716-446655440000')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    it('should return 404 when trying to get deleted event', async () => {
      await supertest(app.getHttpServer())
        .get(`/events/${createdEventId}`)
        .expect(404);
    });
  });
});
