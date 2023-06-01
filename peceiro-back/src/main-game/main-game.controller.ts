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
  Req,
  HttpCode,
} from '@nestjs/common';
import { MainGameService } from './main-game.service';
import { CreateMainGameDto } from './dto/create-main-game.dto';
import { UpdateMainGameDto } from './dto/update-main-game.dto';
import { AuthGuardAdmin } from '../autenticacao/autenticacao.admin.guard';
import { AuthGuard } from '../autenticacao/autenticacao.member.guard';
import { EnterPlay } from './entities/play.entity';

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

  @UseGuards(AuthGuard)
  @Post('v1/game/enter')
  @HttpCode(204)
  enterOnGame(@Req() req: Request, @Body() corpo: EnterPlay) {
    return this.mainGameService.enterOnGame(corpo, req);
  }

  @UseGuards(AuthGuard)
  @Get('v1/game/profile/stats')
  getStatsPlayer(@Req() req: Request) {
    return this.mainGameService.getMyStats(req);
  }
}
