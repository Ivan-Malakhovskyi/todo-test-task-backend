/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  //   @IsArray()
  @IsString()
  readonly artists: string[];
  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;
  @IsString()
  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;
}
