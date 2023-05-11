import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('POST /autenticacao/cadastro - with broken data', async () => {
    await request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send({
        email: 'carlsso@3sf2@gmail.com',
        phone: 67993462261,
        name: 'Victor Gomes',
        password: 'asdadasdadad',
      })
      .expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send({
        email: 'carlsso3sf2@gmail.com',
        phone: '123123123',
        name: 'Victor Gomes',
        password: 'asdadasdadad',
      })
      .expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send({
        email: 'carlsso3sf2@gmail.com',
        phone: 123123123,
        name: 'Victor Gomes',
        password: 'asdas',
      })
      .expect(406);
    return request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send('hiiii!')
      .expect(406);
  });
  it('POST /autenticacao/cadastro - with valid data', async () => {
    return request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send({
        email: 'carlsso3sf2@gmail.com',
        phone: 67993462261,
        name: 'Victor Gomes',
        password: 'asdadasdadad',
      })
      .expect(201);
  });
  it('POST /autenticacao/entrar - with register', async () => {
    await request(app.getHttpServer())
      .post('/autenticacao/cadastro')
      .send({
        email: 'carlsso3sf2@gmail.com',
        phone: 67993462261,
        name: 'Victor Gomes',
        password: 'asdadasdadad',
      })
      .expect(201);

    return request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send({
        email: 'carlsso3sf2@gmail.com',
        password: 'asdadasdadad',
      })
      .expect(201);
  });
  it('POST /autenticacao/entrar - with broken data', async () => {
    await request(app.getHttpServer()).post('/autenticacao/entrar').expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send({
        email: 1,
        password: 1,
      })
      .expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send({
        email: [1, 2],
        password: [1, 2],
      })
      .expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send({
        email: [],
        password: [],
      })
      .expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send({
        password: 0,
      })
      .expect(406);
    await request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send('broken')
      .expect(406);
    return request(app.getHttpServer())
      .post('/autenticacao/entrar')
      .send({
        email: 'carlsssos2@gmail.com',
        password: 'asdadasdadad',
      })
      .expect(404);
  });
});
