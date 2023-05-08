import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseService } from './database.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env' }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.DATABASE_PORT),
      models: [User],
      autoLoadModels: true,
      synchronize: false,
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
