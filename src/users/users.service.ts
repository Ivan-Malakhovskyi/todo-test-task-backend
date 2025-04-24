import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDTO } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const salt = await bcryptjs.genSalt();
    userDTO.password = await bcryptjs.hash(userDTO.password, salt);

    const user = await this.userRepository.save(userDTO);

    const { password, ...rest } = user;
    console.log('dd', password);

    // delete user.password;
    // console.log('REST', rest);

    console.log(user);

    // return rest;
    return rest;
  }

  async findOne(data: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('User was not found 🥲');
    }
    return user;
  }
}
