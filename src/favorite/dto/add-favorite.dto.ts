import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CATEGORIES } from '../favorite.entity';

export class AddFavoriteDto {
  @ApiProperty({
    description: 'Id of the movie or the tv-show',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Id should not be empty' })
  id: number;

  @ApiProperty({
    description: 'Title',
    required: true,
  })
  @IsString({ message: 'Title should be a string' })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Name',
    required: true,
  })
  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Category',
    required: true,
  })
  @IsString({ message: 'Category should be a string' })
  @IsNotEmpty({ message: 'Category should not be empty' })
  @IsEnum(CATEGORIES, { message: 'Category should be a valid value' })
  category: CATEGORIES;

  @ApiProperty({
    description: 'Overview',
    required: true,
  })
  @IsString({ message: 'Overview should be a string' })
  @IsNotEmpty({ message: 'Overview should not be empty' })
  overview: string;

  @ApiProperty({
    description: 'Poster path',
  })
  @IsString({ message: 'Poster path should be a string' })
  @IsOptional()
  poster_path: string;

  @ApiProperty({
    description: 'Release date',
    required: true,
  })
  @IsString({ message: 'Release date should be a string' })
  @IsOptional()
  release_date: Date;

  @ApiProperty({
    description: 'Vote average',
    required: true,
  })
  @IsNumber({}, { message: 'Vote average should be a valid number' })
  @IsNotEmpty({ message: 'Vote average should not be empty' })
  vote_average: number;
}
