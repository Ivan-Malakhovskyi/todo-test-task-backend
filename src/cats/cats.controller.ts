import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
// import { Cat } from 'src/interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAll() {
    return 'All cats';
  }
  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // @Get()
  // @HttpCode(200)
  // getAll(@Req() request: Request): string {
  //   console.log(request);

  //   return 'All cats';
  // }

  @Get('any')
  async findAll(
    @Query('age') age: number,
    @Query('breed') breed: string,
  ): Promise<object[]> {
    console.log(age, breed);
    return [];
  }

  // @Get()
  // async findAllCats(): Promise<Cat[]> {
  //   return this.catsService.findAll();
  // }

  // @Get(':catId')
  // findById(@Param() params: any): string {
  //   console.log(params.catId);
  //   return `I should will cat with id #${params.catId}`;
  // }
}
