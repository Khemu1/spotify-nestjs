import 'reflect-metadata';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Playlist from '../playlists/playlist.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
