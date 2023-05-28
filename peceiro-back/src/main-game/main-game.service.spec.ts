import { Test, TestingModule } from '@nestjs/testing';
import { MainGameService } from './main-game.service';

describe('MainGameService', () => {
  let service: MainGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainGameService],
    }).compile();

    service = module.get<MainGameService>(MainGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
