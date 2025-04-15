import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
