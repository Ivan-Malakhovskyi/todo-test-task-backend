import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  //! with private can use songsService in methods this class
  constructor(private songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':songId')
  findById() {
    return 'fetch song by id';
  }

  @Post()
  create(@Body() newSongDTO: CreateSongDTO) {
    return this.songsService.create(newSongDTO);
  }

  @Patch(':songId')
  update() {
    return 'update song by id';
  }

  @Delete(':songId')
  deleteById() {
    return 'Delete song by id';
  }
}
