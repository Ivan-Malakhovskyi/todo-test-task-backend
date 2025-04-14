import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
// import { MobService } from './mob/mob.service';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [CatsModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
