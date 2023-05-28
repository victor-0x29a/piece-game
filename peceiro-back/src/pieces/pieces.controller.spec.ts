import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';

describe('PiecesController', () => {
  let controller: PiecesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutenticacaoModule],
      controllers: [PiecesController],
      providers: [PiecesService],
    }).compile();

    controller = module.get<PiecesController>(PiecesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
