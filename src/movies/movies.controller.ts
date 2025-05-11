import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchDto } from 'src/tv-shows/dto/search.dto';

@Controller('movies')
@ApiTags('Movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  @Get('popular')
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number for pagination',
    type: Number,
  })
  async getPopularMovies(@Query('page') page: number): Promise<any> {
    return this.moviesService.getPopularMovies(page);
  }

  @Get('upcoming')
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number for pagination',
    type: Number,
  })
  async getUpcomingMovies(@Query('page') page: number): Promise<any> {
    return this.moviesService.getUpcomingMovies(page);
  }

  @Get('search')
  @ApiQuery({
    name: 'Page and search query',
    required: true,
    type: SearchDto,
  })
  async searchMovies(
    @Query() { query, page }: { query: string; page: number },
  ): Promise<any> {
    return this.moviesService.searchMovies({ query, page });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'TV Show ID',
    type: Number,
  })
  async getMovieDetails(@Param('id') id: number): Promise<any> {
    return this.moviesService.getMovieDetails(id);
  }
}
