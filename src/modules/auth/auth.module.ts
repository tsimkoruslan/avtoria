import { Module } from '@nestjs/common';
import { RedisModule } from '@webeleon/nestjs-redis';

import { JwtStrategy } from '../../strategy/jwt.strategy';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    TokenModule,
    RedisModule.forRoot({
      url: process.env.REDIS_URL,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
