import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { SongsRepository } from './songs.repository';
import Song from 'src/core/database/entities/songs/song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';
import { PaginationDTO } from './dto/song-pagination.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongsRepository)
    private readonly songsRepository: SongsRepository,
  ) {}

  async create(songData: CreateSongDTO) {
    const newSong = this.songsRepository.createSongs(songData);
    return newSong;
  }

  async findAll(queries: PaginationDTO) {
    return await this.songsRepository.paginateSongs(queries);
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOne({ where: { id } });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async update(id: number, updateSong: UpdateSongDTO): Promise<Song> {
    console.log('trying to update song');
    const song = await this.songsRepository.updateSong(id, updateSong);
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async delete(id: number) {
    const result = await this.songsRepository.deleteSong(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
  }
}
