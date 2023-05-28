import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainGameService } from './main-game.service';
import { CreateMainGameDto } from './dto/create-main-game.dto';
import { UpdateMainGameDto } from './dto/update-main-game.dto';

@Controller('main-game')
export class MainGameController {
  constructor(private readonly mainGameService: MainGameService) {}

  @Post()
  create(@Body() createMainGameDto: CreateMainGameDto) {
    return this.mainGameService.create(createMainGameDto);
  }

  @Get()
  findAll() {
    return this.mainGameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainGameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainGameDto: UpdateMainGameDto) {
    return this.mainGameService.update(+id, updateMainGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainGameService.remove(+id);
  }
}
