import { Controller, Post } from '@nestjs/common';
import { UserDTO } from '../database/entities/DTO/user.dto';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly AutenticacaoService: AutenticacaoService) {}
  @Post('cadastro')
  async cadastrar(Body: UserDTO) {
    return this.AutenticacaoService.cadastrar(Body);
  }
}
