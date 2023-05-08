import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { ServiceController } from './service/service.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AutenticacaoModule],
  controllers: [AppController, ServiceController],
  providers: [AppService],
})
export class AppModule {}
