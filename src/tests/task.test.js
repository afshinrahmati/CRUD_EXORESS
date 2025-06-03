import request from 'supertest';
import app from '../../server.js';
import mongoose from 'mongoose';

let token;
let taskId;

const testUser = { username: 'taskuser', password: 'taskpass123' };
const testTask = { title: 'Test Task', description: 'Test Description' };

beforeAll(async () => {
  await request(app).post('/api/auth/signup').send(testUser);
  const res = await request(app).post('/api/auth/login').send(testUser);
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(testTask);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    taskId = res.body._id;
  });

  it('should retrieve user tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'in_progress' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('in_progress');
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
