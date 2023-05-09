import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from '../database/entities/DTO/user.dto';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly AutenticacaoService: AutenticacaoService) {}
  @Post('cadastro')
  async cadastrar(@Body() Corpo: UserDTO) {
    return this.AutenticacaoService.cadastrar(Corpo);
  }
  @Post('entrar')
  async entrar(@Body() corpo: Partial<UserDTO>) {
    return this.AutenticacaoService.entrar(corpo);
  }
}
