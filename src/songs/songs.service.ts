import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {}

  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();

    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;
    song.lyrics = songDTO.lyrics;

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  async findById(id: number): Promise<Song> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    return song;
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete({ id });
  }

  update(id: number, updateSongDTO: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update(id, updateSongDTO);
  }
}
