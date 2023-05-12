import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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
  it('GET /user/?', async () => {
    const tokenMember = await auth.Sign(1, 1);

    const tokenStaff = await auth.Sign(1, 2);
    let headers = {
      authorization: tokenMember.token,
    };
    await request(app.getHttpServer()).get('/user/1').set(headers).expect(401);
    headers = {
      authorization: tokenStaff.token,
    };
    return request(app.getHttpServer()).get('/user/1').set(headers).expect(404);
  });
  it('DELETE /user/?', async () => {
    const tokenMember = await auth.Sign(1, 1);

    const tokenStaff = await auth.Sign(1, 2);
    let headers = {
      authorization: tokenMember.token,
    };
    await request(app.getHttpServer())
      .delete('/user/1')
      .set(headers)
      .expect(401);
    headers = {
      authorization: tokenStaff.token,
    };
    return request(app.getHttpServer())
      .delete('/user/1')
      .set(headers)
      .expect(404);
  });
  it('PATCH /user/?', async () => {
    const tokenMember = await auth.Sign(1, 1);

    const tokenStaff = await auth.Sign(1, 2);
    let headers = {
      authorization: tokenMember.token,
    };
    await request(app.getHttpServer())
      .patch('/user/1')
      .set(headers)
      .expect(401);
    headers = {
      authorization: tokenStaff.token,
    };
    await request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send({
        email: 'carlssso3sf2@gmail.com',
        phone: 67993462261,
        name: 'Victor Gomes ss s',
        password: 'asdadasdadad',
      })
      .expect(200);
    await request(app.getHttpServer())
      .patch('/user/1')
      .send({
        email: 'carlsssos2@gmail.com',
        name: 'Victor Gomes ss s2',
        phone: '67993462261',
      })
      .set(headers)
      .expect(406);
    return request(app.getHttpServer())
      .patch('/user/1')
      .send({
        email: 'carlsssos2@gmail.com',
        name: 'Victor Gomes ss s2',
        phone: 67993462261,
      })
      .set(headers)
      .expect(404);
  });
});
