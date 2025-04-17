import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from 'src/common/constants/connection';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song } from './song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [
    SongsService,

    //!OR
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },

    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
