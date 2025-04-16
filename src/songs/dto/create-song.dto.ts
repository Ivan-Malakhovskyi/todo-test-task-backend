/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsString()
  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
