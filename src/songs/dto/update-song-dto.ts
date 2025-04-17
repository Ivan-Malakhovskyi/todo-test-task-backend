import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  readonly artists: string[];

  @IsOptional()
  @IsDateString()
  readonly releasedDate: Date;

  @IsString()
  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
