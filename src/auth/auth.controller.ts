import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAAuth } from './types';
import { RequestUser } from 'src/users/types';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(userDTO);
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() loginDTO: LoginUserDTO): Promise<{ accessToken: string }> {
    return this.authService.login(loginDTO);
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2fa(@Request() req: { user: RequestUser }): Promise<Enable2FAAuth> {
    return this.authService.enableTwoFAAuth(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FAToken(
    @Request() req: { user: RequestUser },
    @Body() validateTokenDto: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDto.token,
    );
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disableTwoFAAuth(
    @Request() req: { user: RequestUser },
  ): Promise<UpdateResult> {
    return this.authService.disableTwoFAAuth(req.user.userId);
  }
}
