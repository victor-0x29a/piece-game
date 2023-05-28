import { Test, TestingModule } from '@nestjs/testing';
import { MainGameController } from './main-game.controller';
import { MainGameService } from './main-game.service';

describe('MainGameController', () => {
  let controller: MainGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainGameController],
      providers: [MainGameService],
    }).compile();

    controller = module.get<MainGameController>(MainGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
