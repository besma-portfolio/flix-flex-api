import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    description: 'Page number for pagination',
    type: Number,
    required: true,
    default: 1,
  })
  page: number;
  @ApiProperty({
    description: 'Search query',
    type: String,
    required: true,
    default: 'Breaking Bad',
  })
  @IsString({ message: 'Query should be a string' })
  @IsNotEmpty({ message: 'Query should not be empty' })
  query: string;
}
