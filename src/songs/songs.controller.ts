import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Connection } from 'src/common/constants/connection';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song-dto';

@Controller('songs')
export class SongsController {
  //! with private can use songsService in methods this class
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log('THIS IS CONNECTION ', this.connection.DB);
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    } catch (error) {
      console.log('From catch', error);
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Get(':songId')
  findById(
    @Param(
      'songId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    songId: number,
  ): Promise<Song> {
    return this.songsService.findById(songId);
  }

  @Post()
  create(@Body() newSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(newSongDTO);
  }

  @Patch(':songId')
  update(
    @Param('songId', ParseIntPipe)
    songId: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.update(songId, updateSongDTO);
  }

  @Delete(':songId')
  deleteById(
    @Param(
      'songId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    songId: number,
  ): Promise<DeleteResult> {
    return this.songsService.deleteById(songId);
  }
}
