import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('json') //!In postgres will be  varchar, {array:true}
  artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text', { default: null })
  lyrics: string;
}
