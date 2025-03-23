import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';
import User from './entities/users/user.entity';
import Playlist from './entities/playlists/playlist.entity';
import Song from './entities/songs/song.entity';
import PlaylistSong from './entities/playlists/playlist-song.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASS || '',
  database: process.env.DATABASE_NAME || 'spotify',
  entities: [User, Playlist, Song, Playlist, PlaylistSong],

  migrations: [path.join(__dirname, '/migrations/*.ts')], // ✅ Works in CommonJS
  synchronize: true,
  logging: true,
});
