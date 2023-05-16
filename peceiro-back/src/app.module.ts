import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PiecesModule } from './pieces/pieces.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AutenticacaoModule,
    PiecesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
