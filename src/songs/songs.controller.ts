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
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Connection } from 'src/common/constants/connection';

@Controller({ path: 'songs', scope: Scope.REQUEST })
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
  findAll() {
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
  ) {
    return `Type of the parameter will be ${typeof songId}`;
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
