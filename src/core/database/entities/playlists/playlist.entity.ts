import 'reflect-metadata';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../users/user.entity';
import PlaylistSong from './playlist-song.entity';

@Entity()
export default class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.playlist, {
    cascade: true,
  })
  playlistSongs: PlaylistSong[];

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
