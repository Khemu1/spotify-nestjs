import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsMilitaryTime,
} from 'class-validator';

export class CreateSongDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate!: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  duration!: string;
}
