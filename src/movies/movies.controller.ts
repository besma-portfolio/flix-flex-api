import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SearchDto } from 'src/tv-shows/dto/search.dto';

@Controller('movies')
@ApiTags('Movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  @Get('popular')
  @ApiOperation({
    summary: 'Get popular movies',
    description: 'Fetches paginated list of popular movies',
  })
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
  @ApiOperation({
    summary: 'Get upcoming movies',
    description: 'Fetches paginated list of upcoming movies',
  })
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
  @ApiOperation({
    summary: 'Search movies',
    description: 'Fetches paginated list of movies based on search query',
  })
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
  @ApiOperation({
    summary: 'Get movie details',
    description: 'Fetches details of a specific movie by ID',
  })
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
