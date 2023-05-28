import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutenticacaoModule, DatabaseModule],
      controllers: [UserController],
      providers: [UserService, AutenticacaoService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('nothing data', async () => {
    const allData = await service.findAll();
    expect(allData.data.length).toBe(0);
    expect(async () => await service.findOne(1)).rejects.toThrowError(
      NotFoundException,
    );
    return expect(
      async () =>
        await service.update(1, {
          email: 'teste@teste.com',
          name: 'Teste',
          phone: 99999999,
          password: '',
          authLevel: 1,
        }),
    ).rejects.toThrowError(NotFoundException);
  });
});
