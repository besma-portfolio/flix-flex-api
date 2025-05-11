import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './favorite.entity';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteRepository, FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule { }
