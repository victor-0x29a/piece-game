import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AutenticacaoService } from '../src/autenticacao/autenticacao.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let auth: AutenticacaoService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AutenticacaoService],
    }).compile();
    auth = moduleFixture.get<AutenticacaoService>(AutenticacaoService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('GET /user', async () => {
    const tokenMember = await auth.Sign(1, 1);

    const tokenStaff = await auth.Sign(1, 2);
    let headers = {
      authorization: tokenMember.token,
    };
    await request(app.getHttpServer()).get('/user').set(headers).expect(401);
    headers = {
      authorization: tokenStaff.token,
    };
    return request(app.getHttpServer()).get('/user').set(headers).expect(200);
  });
});
