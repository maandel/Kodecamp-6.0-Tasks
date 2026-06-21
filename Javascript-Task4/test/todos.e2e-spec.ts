import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('TodosController (e2e)', () => {
  let app: INestApplication<App>;
  let createdTodoId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/todos (GET) - should return an array', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/todos (POST) - should create a new todo', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({
        title: 'E2E Test Todo',
        description: 'Testing the API',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe('E2E Test Todo');
        expect(res.body.description).toBe('Testing the API');
        expect(res.body.status).toBe('pending');
        createdTodoId = res.body.id;
      });
  });

  it('/todos/:id (GET) - should return the created todo', () => {
    return request(app.getHttpServer())
      .get(`/todos/${createdTodoId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdTodoId);
        expect(res.body.title).toBe('E2E Test Todo');
      });
  });

  it('/todos/:id (PUT) - should update the todo', () => {
    return request(app.getHttpServer())
      .put(`/todos/${createdTodoId}`)
      .send({
        status: 'in-progress',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdTodoId);
        expect(res.body.status).toBe('in-progress');
      });
  });

  it('/todos/:id (DELETE) - should delete the todo', () => {
    return request(app.getHttpServer())
      .delete(`/todos/${createdTodoId}`)
      .expect(200);
  });

  it('/todos/:id (GET) - should return 404 after deletion', () => {
    return request(app.getHttpServer())
      .get(`/todos/${createdTodoId}`)
      .expect(404);
  });
});
