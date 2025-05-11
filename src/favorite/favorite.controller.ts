import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
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
    description: 'Get all favorite movies and tv shows',
  })
  getFavorites(@Request() { user }: { user: { id: string } }) {
    return this.favoriteService.getFavorites(user.id);
  }

  @Post('add')
  @ApiOperation({
    description: 'Add a favorite movie or tv show',
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
    description: 'Remove a favorite movie or tv show',
  })
  removeFavorite(
    @Request() { user }: { user: { id: string } },
    @Body() removeFavoriteDto: RemoveFavoriteDto,
  ) {
    return this.favoriteService.removeFavorite(user.id, removeFavoriteDto);
  }
}
