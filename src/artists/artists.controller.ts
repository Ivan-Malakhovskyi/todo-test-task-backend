import { Controller, Post } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
  @Post()
  createArtist() {}
}
