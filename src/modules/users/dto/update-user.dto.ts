import { IsOptional, IsString } from 'class-validator';
import { AtLeastOneField } from 'src/core/decorators/songs/at-least-one-field.decorator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  usname?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @AtLeastOneField(['usname', 'password'], {
    message:
      'At least one field (title, artist, releaseDate, duration) is required.',
  })
  _atLeastOneField!: string;
}
