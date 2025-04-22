import { Song } from 'src/songs/song.entity';
import { User2 } from 'src/users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User2)
  @JoinColumn()
  user: User2;

  @ManyToMany(() => Song, (song) => song.artists, { cascade: true })
  songs: Song[];
}
