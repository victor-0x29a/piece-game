import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PiecesModule } from './pieces/pieces.module';
import { MainGameModule } from './main-game/main-game.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AutenticacaoModule,
    PiecesModule,
    MainGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
