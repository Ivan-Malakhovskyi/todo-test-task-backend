import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import { CatsController } from './cats/cats.controller';
import { MobService } from './mob/mob.service';

@Module({
  imports: [],
  controllers: [AppController, CarsController, CatsController],
  providers: [AppService, MobService],
})
export class AppModule {}
