import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedisModule } from '@webeleon/nestjs-redis';

import configurations from './configurations';
import { AuthModule } from './modules/auth/auth.module';
import { CarListModule } from './modules/car.list/car.list.module';
import { CarList } from './modules/car.list/carlist.model';
import { TokenModule } from './modules/token/token.module';
import { User } from './modules/user/user.model';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    RedisModule.forRoot({
      url: process.env.REDIS_URL,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, CarList],
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    CarListModule,
  ],
})
export class AppModule {}
