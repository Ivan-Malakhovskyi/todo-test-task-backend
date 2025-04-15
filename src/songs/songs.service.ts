import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  private readonly songs = [] as object[];

  create(song: object) {
    this.songs.push(...this.songs, { id: Date.now(), ...song });

    return this.songs;
  }

  findAll() {
    // throw new Error('Invoke Error exeption');
    return this.songs;
  }
}
