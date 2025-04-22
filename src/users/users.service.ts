import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User2 } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User2)
    private userRepository: Repository<User2>,
  ) {}

  async createUser(userDTO: CreateUserDTO): Promise<User2> {
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
}
