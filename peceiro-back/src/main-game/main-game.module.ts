import { Module } from '@nestjs/common';
import { MainGameService } from './main-game.service';
import { MainGameController } from './main-game.controller';

@Module({
  controllers: [MainGameController],
  providers: [MainGameService]
})
export class MainGameModule {}
