import 'reflect-metadata';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Playlist from '../playlists/playlist.entity';

@Entity()
export default class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('time')
  duration: Date;
  @Column('text')
  artist: string;
  @Column('timestamptz')
  releaseDate: Date;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date;
  @ManyToOne(() => Playlist, (playlist) => playlist.songs, { cascade: true })
  playlist: Playlist | null;
}
