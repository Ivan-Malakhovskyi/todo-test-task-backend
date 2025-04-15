import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database.module';
import { playlistProviders } from 'src/providers/playlist.provider';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [DatabaseModule],
  providers: [...playlistProviders, PlaylistService],
})
export class PhotoModule {}
