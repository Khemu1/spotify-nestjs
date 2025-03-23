import 'reflect-metadata';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../users/user.entity';
import Song from '../songs/song.entity';

@Entity()
export default class Playlist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date;
  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];
  @ManyToOne(() => User, (user) => user.playlists)
  @JoinColumn({ name: 'userId' })
  user: User;
}
