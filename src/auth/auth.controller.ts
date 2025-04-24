import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';

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
}
