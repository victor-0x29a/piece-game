import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { DatabaseModule } from '../database/database.module';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';

describe('PiecesController', () => {
  let controller: PiecesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, AutenticacaoModule],
      controllers: [PiecesController],
      providers: [PiecesService],
    }).compile();

    controller = module.get<PiecesController>(PiecesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('data invalid', async () => {
    expect(
      async () => await controller.findOne("{'luiz': '1'}"),
    ).rejects.toThrowError(NotAcceptableException);
    expect(async () => await controller.findOne('-1')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(async () => await controller.findOne('a')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(async () => await controller.findOne('.')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(async () => await controller.findOne('[1,2]')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(async () => await controller.remove('[1,2]')).rejects.toThrowError(
      NotAcceptableException,
    );
    expect(
      async () =>
        await controller.update('[1,2]', {
          category: {
            id: 1,
            name: 'Placa de video',
          },
          product: 'NVIDIA RTX 3080 1',
        }),
    ).rejects.toThrowError(NotAcceptableException);
  });
  it('not found data', async () => {
    expect(async () => await controller.findOne('1')).rejects.toThrowError(
      NotFoundException,
    );
    expect(async () => await controller.remove('1')).rejects.toThrowError(
      NotFoundException,
    );
    expect(
      async () =>
        await controller.update('1', {
          category: {
            id: 1,
            name: 'Placa de video',
          },
          product: 'NVIDIA RTX 3080 1',
        }),
    ).rejects.toThrowError(NotFoundException);
  });
});
