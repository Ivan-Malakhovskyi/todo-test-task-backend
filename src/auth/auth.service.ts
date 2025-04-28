import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ArtistsService } from 'src/artists/artists.service';
import { LoginUserDTO } from 'src/auth/dto/login-user.dto';
import { UserService } from 'src/users/users.service';
import { PayloadType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
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

      const payload: PayloadType = {
        email: rest.email,
        userId: rest.id,
        artistId: user.id,
      };

      const artist = await this.artistsService.findArtist(user.id);

      if (artist) {
        payload.artistId = artist.id;
      }

      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }
}
