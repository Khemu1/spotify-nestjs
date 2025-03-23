import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import User from './entities/users/user.entity';
import Playlist from './entities/playlists/playlist.entity';
import Song from './entities/songs/song.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', //  Explicitly set the env file path
    }),
    /**
     * accepts all configuration properties exposed by the
DataSource constructor in the TypeORM packag
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASS || '',
      database: process.env.DATABASE_NAME || 'spotify',
      entities: [User, Playlist, Song],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor() {
    console.log('✅ ENV VARIABLES LOADED:');
    console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
    console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
    console.log('DATABASE_USER:', process.env.DATABASE_USER);
    console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
  }
}
