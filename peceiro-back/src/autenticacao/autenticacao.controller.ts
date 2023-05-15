import { Controller, Post, Body, Request, HttpCode } from '@nestjs/common';
import { UserDTO } from '../user/dto/create-user.dto';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly AutenticacaoService: AutenticacaoService) {}
  @Post('cadastro')
  async cadastrar(@Body() Corpo: UserDTO) {
    return this.AutenticacaoService.cadastrar(Corpo);
  }
  @Post('entrar')
  @HttpCode(200)
  async entrar(@Body() corpo: Partial<UserDTO>) {
    return this.AutenticacaoService.entrar(corpo);
  }
  @Post('refresh')
  async refresh(@Request() req) {
    return this.AutenticacaoService.refresh(req);
  }
}
