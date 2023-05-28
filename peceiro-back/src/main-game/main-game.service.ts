import { Injectable } from '@nestjs/common';
import { CreateMainGameDto } from './dto/create-main-game.dto';
import { UpdateMainGameDto } from './dto/update-main-game.dto';

@Injectable()
export class MainGameService {
  create(createMainGameDto: CreateMainGameDto) {
    return 'This action adds a new mainGame';
  }

  findAll() {
    return `This action returns all mainGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mainGame`;
  }

  update(id: number, updateMainGameDto: UpdateMainGameDto) {
    return `This action updates a #${id} mainGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} mainGame`;
  }
}
