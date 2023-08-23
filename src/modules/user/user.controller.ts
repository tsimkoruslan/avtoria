import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }
}
