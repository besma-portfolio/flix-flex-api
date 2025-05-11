import { Injectable, Logger } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { RemoveFavoriteDto } from './dto/remove-favorite.dto';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';
import { EXCEPTIONS } from 'src/utils/exceptions/exceptions';

@Injectable()
export class FavoriteService {
  private readonly logger = new Logger(FavoriteService.name);

  constructor(private favoriteRepository: FavoriteRepository) { }

  async getFavorites(userId: string) {
    return this.favoriteRepository.find({
      user: userId,
    });
  }

  async addFavorite(userId: string, adddFavoriteDto: AddFavoriteDto) {
    try {
      const newFavorite = await this.favoriteRepository.create({
        user: userId,
        ...adddFavoriteDto,
      });
      return newFavorite;
    } catch (error) {
      this.logger.error('failed to add favorite', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when adding favorite',
      );
    }
  }

  async removeFavorite(userId, removeFavoriteDto: RemoveFavoriteDto) {
    const favorite = await this.favoriteRepository.findOne({
      user: userId,
      id: removeFavoriteDto.id,
      category: removeFavoriteDto.category,
    });
    if (!favorite) {
      this.logger.error('No favorite found');
      throw new CustomHttpException(EXCEPTIONS.NOT_FOUND, 'No favorite found');
    }
    try {
      await this.favoriteRepository.findOneAndDelete({
        user: userId,
        id: removeFavoriteDto.id,
        category: removeFavoriteDto.category,
      });
      return {
        statusCode: 200,
        message: `Favorite has been successfully deleted.`,
      };
    } catch (error) {
      this.logger.error('failed to delete favorite', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when deleting favorite',
      );
    }
  }
}
