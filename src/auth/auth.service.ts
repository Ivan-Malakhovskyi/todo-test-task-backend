import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDTO } from 'src/auth/dto/login-user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDTO: LoginUserDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO);

    const isPasswordUserMatched = await bcryptjs.compare(
      loginDTO.password,
      user.password,
    );

    if (!isPasswordUserMatched) {
      throw new UnauthorizedException("Password doesn't match");
    } else {
      const { password, ...rest } = user;

      const payload = { email: rest.email, sub: rest.id };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }
}
