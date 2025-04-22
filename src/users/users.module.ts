import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User2 } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User2])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
