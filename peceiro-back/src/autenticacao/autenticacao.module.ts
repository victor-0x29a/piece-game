import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';

@Module({
  controllers: [AutenticacaoController]
})
export class AutenticacaoModule {}
