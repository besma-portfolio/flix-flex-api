import { Test, TestingModule } from '@nestjs/testing';
import { TvShowsController } from './tv-shows.controller';

describe('TvShowsController', () => {
  let controller: TvShowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvShowsController],
    }).compile();

    controller = module.get<TvShowsController>(TvShowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
