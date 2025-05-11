import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TvShowsService } from './tv-shows.service';
import { SearchDto } from './dto/search.dto';

@Controller('tv-shows')
@ApiTags('TV Shows')
@ApiBearerAuth()
export class TvShowsController {
  constructor(private tvShowsService: TvShowsService) { }

  @Get('popular')
  @ApiOperation({
    summary: 'Get popular TV shows',
    description: 'Fetches paginated list of popular TV shows',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number for pagination',
    type: Number,
  })
  async getPopularTvShows(@Query('page') page: number): Promise<any> {
    return this.tvShowsService.getPopularTvShows(page);
  }

  @Get('top-rated')
  @ApiOperation({
    summary: 'Get top-rated TV shows',
    description: 'Fetches paginated list of top-rated TV shows',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number for pagination',
    type: Number,
  })
  async getTopRatedTvShows(@Query('page') page: number): Promise<any> {
    return this.tvShowsService.getTopRatedTvShows(page);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search TV shows',
    description: 'Fetches paginated list of TV shows based on search query',
  })
  @ApiQuery({
    name: 'Page and search query',
    required: true,
    type: SearchDto,
  })
  async searchTvShows(
    @Query() { query, page }: { query: string; page: number },
  ): Promise<any> {
    return this.tvShowsService.searchTvShows({ query, page });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get TV show details',
    description: 'Fetches details of a specific TV show by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'TV Show ID',
    type: Number,
  })
  async getTvShowDetails(@Param('id') id: number): Promise<any> {
    return this.tvShowsService.getTvShowDetails(id);
  }
}
