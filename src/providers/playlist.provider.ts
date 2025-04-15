import { Playlist } from 'src/playlist/playlist.entity';
import { DataSource } from 'typeorm';

export const playlistProviders = [
  {
    provide: 'PLAYLIST',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Playlist),
    inject: ['DATA_SOURCE'],
  },
];
