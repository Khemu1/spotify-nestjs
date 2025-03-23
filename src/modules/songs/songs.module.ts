import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import Song from 'src/core/database/entities/songs/song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsRepository } from './songs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService, SongsRepository],
  exports: [SongsRepository],
})
export class SongsModule {}
