import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '../user/user.dto';
import { UserLoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthUserResponse } from './response';
import { LogoutGuard } from '../../guards/logout-guard';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard, LogoutGuard)
  @Post('logout')
  async logout (@Res() res: any){
    return res.status(HttpStatus.OK).json('Logout')
  }
}
