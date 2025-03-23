import { Injectable } from '@nestjs/common';
import Song from 'src/core/database/entities/songs/song.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PaginationDTO } from './dto/song-pagination.dto';

@Injectable()
export class SongsRepository extends Repository<Song> {
  constructor(private readonly dataSource: DataSource) {
    super(Song, dataSource.createEntityManager());
  }

  async createSongs(song: CreateSongDTO) {
    return await this.save(song);
  }

  async findByid(id: number) {
    return this.findOne({ where: { id } });
  }

  async updateSong(id: number, updatedSong: UpdateSongDTO) {
    await this.update(id, updatedSong);
    return await this.findOne({ where: { id } });
  }

  async paginateSongs(options: PaginationDTO): Promise<Pagination<Song>> {
    const queryBuilder = this.createQueryBuilder('song').orderBy(
      'song.id',
      'ASC',
    );
    return paginate<Song>(queryBuilder, options as IPaginationOptions);
  }

  async deleteSong(id: number) {
    return await this.delete(id);
  }
}
