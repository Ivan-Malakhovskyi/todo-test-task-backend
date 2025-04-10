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
import { CreateCatDto } from '../dto/create-cats.dto';

@Controller('cats')
export class CatsController {
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'Here will be create action';
  }

  @Get()
  @HttpCode(200)
  getAll(@Req() request: Request): string {
    console.log(request);

    return 'All cats';
  }

  @Get()
  async findAll(
    @Query('age') age: number,
    @Query('breed') breed: string,
  ): Promise<object[]> {
    console.log(age, breed);
    return [];
  }

  @Get(':catId')
  findById(@Param() params: any): string {
    console.log(params.catId);
    return `I should will cat with id #${params.catId}`;
  }
}
