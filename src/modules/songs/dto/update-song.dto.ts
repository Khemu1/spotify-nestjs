import {
  IsDateString,
  IsString,
  IsMilitaryTime,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { AtLeastOneField } from 'src/core/decorators/songs/at-least-one-field.decorator';

export class UpdateSongDTO {
  @IsOptional()
  @IsString()
  @ValidateIf((obj: UpdateSongDTO) => obj.title !== undefined)
  title?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((obj: UpdateSongDTO) => obj.artist !== undefined)
  artist?: string;

  @IsOptional()
  @IsDateString()
  @ValidateIf((obj: UpdateSongDTO) => obj.releaseDate !== undefined)
  releaseDate?: string;

  @IsOptional()
  @IsMilitaryTime()
  @ValidateIf((obj: UpdateSongDTO) => obj.duration !== undefined)
  duration?: string;

  @AtLeastOneField(['title', 'artist', 'releaseDate', 'duration'], {
    message:
      'At least one field (title, artist, releaseDate, duration) is required.',
  })
  _atLeastOneField!: string;
}
