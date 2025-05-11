import { Module } from '@nestjs/common';
import { TvShowsService } from './tv-shows.service';
import { TvShowsController } from './tv-shows.controller';

@Module({
  providers: [TvShowsService],
  controllers: [TvShowsController],
})
export class TvShowsModule { }
