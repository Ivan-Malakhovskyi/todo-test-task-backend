import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('BEFORE CALL getHello()');
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) //* middleware
  getProfile(@Req() request: { user: User }) {
    return request.user;
  }
}
