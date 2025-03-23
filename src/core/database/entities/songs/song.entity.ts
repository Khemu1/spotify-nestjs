import 'reflect-metadata';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PlaylistSong from '../playlists/playlist-song.entity';

@Entity()
export default class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  artist: string;

  @Column('time')
  duration: string;

  @Column('timestamptz')
  releaseDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.song, {
    cascade: true,
  })
  playlistSongs: PlaylistSong[];
}
