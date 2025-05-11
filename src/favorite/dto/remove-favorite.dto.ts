import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CATEGORIES } from '../favorite.entity';

export class RemoveFavoriteDto {
  @ApiProperty({
    description: 'Id of the movie or the tv-show',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Id should not be empty' })
  id: number;

  @ApiProperty({
    description: 'Category',
    required: true,
  })
  @IsString({ message: 'Category should be a string' })
  @IsNotEmpty({ message: 'Category should not be empty' })
  @IsEnum(CATEGORIES, { message: 'Category should be a valid value' })
  category: CATEGORIES;
}
