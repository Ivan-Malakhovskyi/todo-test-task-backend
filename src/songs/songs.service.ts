import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();

    song.title = songDTO.title;
    // song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;
    song.lyrics = songDTO.lyrics;

    const artists = await this.artistRepository.findByIds(songDTO.artists);
    song.artists = artists;

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

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('s');

    queryBuilder.orderBy('s.releasedDate', 'DESC');

    return await paginate<Song>(queryBuilder, options);
  }
}
