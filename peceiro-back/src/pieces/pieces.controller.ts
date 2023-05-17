import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { AuthGuard } from '../autenticacao/autenticacao.member.guard';
import { AuthGuardAdmin } from '../autenticacao/autenticacao.admin.guard';

@Controller('pieces')
export class PiecesController {
  constructor(private readonly piecesService: PiecesService) {}

  @Get('preset')
  getpreset() {
    return this.piecesService.preset();
  }

  @UseGuards(AuthGuardAdmin)
  @Post()
  create(@Body() createPieceDto: CreatePieceDto) {
    return this.piecesService.create(createPieceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.piecesService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piecesService.findOne(+id);
  }

  @UseGuards(AuthGuardAdmin)
  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePieceDto: UpdatePieceDto) {
    return this.piecesService.update(+id, updatePieceDto);
  }
  @UseGuards(AuthGuardAdmin)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piecesService.remove(+id);
  }
}
