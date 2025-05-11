import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('favorite')
@ApiTags('Favorite')
@ApiBearerAuth()
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) { }

  @Get()
  @ApiOperation({
    summary: 'Get all favorite movies and tv shows',
    description:
      'Fetches all favorite movies and tv shows for the authenticated user',
  })
  getFavorites(@Request() { user }: { user: { id: string } }) {
    return this.favoriteService.getFavorites(user.id);
  }

  @Post('add')
  @ApiOperation({
    summary: 'Add a favorite movie or tv show',
    description:
      "Adds a movie or tv show to the authenticated user's favorites",
  })
  @ApiBody({
    description: 'Favorite data to add',
    type: AddFavoriteDto,
    required: true,
  })
  addFavorite(
    @Request() { user }: { user: { id: string } },
    @Body() addFavoriteDto: AddFavoriteDto,
  ) {
    return this.favoriteService.addFavorite(user.id, addFavoriteDto);
  }

  @Post('remove')
  @ApiBody({
    description: 'Favorite data to remove',
    type: RemoveFavoriteDto,
    required: true,
  })
  @ApiOperation({
    summary: 'Remove a favorite movie or tv show',
    description:
      "Removes a movie or tv show from the authenticated user's favorites",
  })
  removeFavorite(
    @Request() { user }: { user: { id: string } },
    @Body() removeFavoriteDto: RemoveFavoriteDto,
  ) {
    return this.favoriteService.removeFavorite(user.id, removeFavoriteDto);
  }
}
