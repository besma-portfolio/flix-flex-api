import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite, FavoriteDocument } from './favorite.entity';

@Injectable()
export class FavoriteRepository extends EntityRepository<FavoriteDocument> {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {
    super(favoriteModel);
  }
}
