import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User2 } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<User2> {
    return this.userService.createUser(userDTO);
  }
}
