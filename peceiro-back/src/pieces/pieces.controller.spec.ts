import { Test, TestingModule } from '@nestjs/testing';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';

describe('PiecesController', () => {
  let controller: PiecesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiecesController],
      providers: [PiecesService],
    }).compile();

    controller = module.get<PiecesController>(PiecesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
