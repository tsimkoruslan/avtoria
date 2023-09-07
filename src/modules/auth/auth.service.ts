import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import * as bcrypt from 'bcrypt';

import { AppError } from '../../common/constans/errors';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { UserLoginDTO } from './auth.dto';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @InjectRedisClient() private readonly redisClient: RedisClient,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return await this.userService.createUser(dto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
      const user = await this.userService.publicUser(dto.email);
      const token = await this.tokenService.generateJwtToken(user);
       await this.redisClient.setEx(user.email, 10000, token);
      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
}
