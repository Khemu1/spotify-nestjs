import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  HttpStatus,
  Delete,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { PaginationDTO } from './dto/song-pagination.dto';

// this tells that the route starts with /songs/
@Controller('songs')
export class SongsController {
  // Injecting the service into the controller
  constructor(private songService: SongsService) {}

  @Get()
  async getAllSongs(@Query() query: PaginationDTO) {
    return await this.songService.findAll(query);
  }

  @Get(':id')
  async getSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const song = this.songService.findOne(id);
    return song;
  }

  @Post()
  async createSong(@Body() createSong: CreateSongDTO) {
    return await this.songService.create(createSong);
  }

  @Put(':id')
  async updateSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSong: UpdateSongDTO,
  ) {
    const updatedSong = await this.songService.update(id, updateSong);
    return updatedSong;
  }
  @Delete(':id')
  async deleteSong(@Param('id', new ParseIntPipe()) id: number) {
    await this.songService.delete(id);
    return id;
  }
}
