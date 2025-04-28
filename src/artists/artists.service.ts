import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) {}

  async findArtist(artistId: number): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({
      user: {
        id: artistId,
      },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ${artistId} not found`);
    } else {
      return artist;
    }
  }
}
