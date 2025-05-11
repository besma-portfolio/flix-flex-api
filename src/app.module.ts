import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteModule } from './favorite/favorite.module';
import { MoviesModule } from './movies/movies.module';
import { TvShowsModule } from './tv-shows/tv-shows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        dbName: configService.get<string>('DB_NAME'),
      }),
    }),
    AuthModule,
    UserModule,
    FavoriteModule,
    MoviesModule,
    TvShowsModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
