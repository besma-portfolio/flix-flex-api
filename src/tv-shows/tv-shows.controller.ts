import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TvShowsService } from './tv-shows.service';
import { SearchDto } from './dto/search.dto';

@Controller('tv-shows')
@ApiTags('TV Shows')
@ApiBearerAuth()
export class TvShowsController {
  constructor(private tvShowsService: TvShowsService) { }

  @Get('popular')
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
