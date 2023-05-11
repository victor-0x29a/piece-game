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
      host:
        process.env.NODE_ENV !== 'test'
          ? process.env.DATABASE_HOST
          : process.env.DATABASETEST_HOST,
      username:
        process.env.NODE_ENV !== 'test'
          ? process.env.DATABASE_USER
          : process.env.DATABASETEST_USER,
      password:
        process.env.NODE_ENV !== 'test'
          ? process.env.DATABASE_PASS
          : process.env.DATABASETEST_PASS,
      database:
        process.env.NODE_ENV !== 'test'
          ? process.env.DATABASE_NAME
          : process.env.DATABASETEST_NAME,
      port:
        process.env.NODE_ENV !== 'test'
          ? Number(process.env.DATABASE_PORT)
          : Number(process.env.DATABASETEST_PORT),
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
