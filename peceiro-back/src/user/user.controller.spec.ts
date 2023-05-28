import { Test, TestingModule } from '@nestjs/testing';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutenticacaoModule, DatabaseModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('broken the app', async () => {
    expect(async () => await controller.findOne('a')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(
      async () => await controller.findOne('{ name: 1 }'),
    ).rejects.toThrowError(NotAcceptableException);
    //expect(async () => await controller.findOne('1.0')).rejects.toThrowError(
    //NotAcceptableException,
    //);
    expect(async () => await controller.findOne('.')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(async () => await controller.findOne(',')).rejects.toThrowError(
      NotAcceptableException,
    );
  });
  it('data inexist', async () => {
    expect(async () => await controller.findOne('999')).rejects.toThrowError(
      NotFoundException,
    );
    expect(async () => await controller.remove('999')).rejects.toThrowError(
      NotFoundException,
    );
  });
});
