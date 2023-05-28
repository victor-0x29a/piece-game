import { Test, TestingModule } from '@nestjs/testing';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

describe('PiecesService', () => {
  let service: PiecesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutenticacaoModule, DatabaseModule],
      controllers: [PiecesController],
      providers: [PiecesService],
    }).compile();

    service = module.get<PiecesService>(PiecesService);
  });

  it('should be defined', async () => {
    return expect(service).toBeDefined();
  });
  it('data invalid', async () => {
    expect(
      async () =>
        await service.create({
          category: {
            id: 998,
            name: 'Placa de video',
          },
          product: 'ASDASDASAD',
        }),
    ).rejects.toThrowError(NotFoundException);
    expect(
      async () =>
        await service.create({
          category: {
            id: 5,
            name: '',
          },
          product: '',
        }),
    ).rejects.toThrowError(NotAcceptableException);
  });

  it('data valid', async () => {
    const letters: string[] = ['s2asda', '2s2sb', 'asdasda'];
    const create = await service.create({
      category: {
        id: 1,
        name: 'Placa de video',
      },
      product:
        letters[Math.floor(Math.random() * letters.length) - 1] +
        letters[Math.floor(Math.random() * letters.length) - 1] +
        'xx0',
    });
    expect(create).toEqual(true);
    expect(
      async () =>
        await service.create({
          category: {
            id: 1,
            name: 'Placa de video',
          },
          product: 'NVIDIA RTX 3080',
        }),
    ).toEqual(expect.any(Function));
  });
  it('not found data', async () => {
    expect(async () => await service.remove(1)).rejects.toThrowError(
      NotFoundException,
    );
    expect(async () => await service.findOne(70)).rejects.toThrowError(
      NotFoundException,
    );
    expect(
      async () =>
        await service.update(80, {
          category: {
            id: 4,
            name: 'Placa de video',
          },
          product: 'NVIDIA RTX 3080 1',
        }),
    ).rejects.toThrowError(NotFoundException);
  });
});
