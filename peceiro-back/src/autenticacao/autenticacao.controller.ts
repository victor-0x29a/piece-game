import { Controller, Post } from '@nestjs/common';
import { UserDTO } from '../database/entities/DTO/user.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  @Post('cadastro')
  cadastrar(Body: UserDTO) {
    //
  }
}
