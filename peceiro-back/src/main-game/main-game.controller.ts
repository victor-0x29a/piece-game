import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotAcceptableException,
  UseGuards,
} from '@nestjs/common';
import { MainGameService } from './main-game.service';
import { CreateMainGameDto } from './dto/create-main-game.dto';
import { UpdateMainGameDto } from './dto/update-main-game.dto';
import { AuthGuardAdmin } from '../autenticacao/autenticacao.admin.guard';

@Controller('main-game')
export class MainGameController {
  constructor(private readonly mainGameService: MainGameService) {}

  @UseGuards(AuthGuardAdmin)
  @Post()
  create(@Body() createMainGameDto: CreateMainGameDto) {
    return this.mainGameService.create(createMainGameDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Get()
  findAll() {
    return this.mainGameService.findAll();
  }

  @UseGuards(AuthGuardAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new NotAcceptableException('Opa.', 'ID inválido.');
    }
    return this.mainGameService.findOne(+id);
  }

  @UseGuards(AuthGuardAdmin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMainGameDto: UpdateMainGameDto,
  ) {
    if (isNaN(Number(id))) {
      throw new NotAcceptableException('Opa.', 'ID inválido.');
    }
    return this.mainGameService.update(+id, updateMainGameDto);
  }

  @UseGuards(AuthGuardAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new NotAcceptableException('Opa.', 'ID inválido.');
    }
    return this.mainGameService.remove(+id);
  }
}
