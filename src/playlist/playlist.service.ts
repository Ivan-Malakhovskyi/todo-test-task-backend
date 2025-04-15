import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject('PLAYLIST')
    private playlist: Repository<Playlist>,
  ) {}

  async findAll(): Promise<Playlist[]> {
    return this.playlist.find();
  }
}
