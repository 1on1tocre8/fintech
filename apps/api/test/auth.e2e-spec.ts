import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('login → me → refresh → logout → refresh fails', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'password' })
      .expect(200);
    const { accessToken, refreshToken } = loginRes.body;

    await request(app.getHttpServer())
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const refreshRes = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${refreshToken}`)
      .expect(200);
    const newRefresh = refreshRes.body.refreshToken;

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${newRefresh}`)
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${newRefresh}`)
      .expect(401);
  });
});
