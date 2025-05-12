import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';
import { EXCEPTIONS } from 'src/utils/exceptions/exceptions';
import { throwIfCustomHttpException } from 'src/utils/exceptions/throw-if-custom.exception';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private tmbdApiKey: string;
  private tmbdApiUrl: string;

  constructor(private configService: ConfigService) {
    this.tmbdApiKey = this.configService.get<string>('THEMOVIEDB_API_KEY') ?? '';
    this.tmbdApiUrl = this.configService.get<string>('THEMOVIEDB_URL') ?? '';
  }

  async getPopularMovies(page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/movie/popular`, {
        params: {
          api_key: this.tmbdApiKey,
          page,
        },
      });
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      this.logger.error('failed to get popular movies', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when getting popular movies',
      );
    }
  }

  async getUpcomingMovies(page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/movie/upcoming`, {
        params: {
          api_key: this.tmbdApiKey,
          page,
        },
      });
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      this.logger.error('failed to get upcoming movies', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when getting upcoming movies',
      );
    }
  }

  async getMovieDetails(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/movie/${id}`, {
        params: {
          api_key: this.tmbdApiKey,
          append_to_response: 'videos',
        },
      });
      if (response.status !== 200) {
        throw new CustomHttpException(
          EXCEPTIONS.NOT_FOUND,
          'Movie not found',
        );
      }
      return response.data;
    } catch (error) {
      throwIfCustomHttpException(error);
      if (error.response?.status === 404) {
        throw new CustomHttpException(
          EXCEPTIONS.NOT_FOUND,
          'Movie not found',
        );
      }
      this.logger.error('failed to get movie details', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when getting movie details',
      );
    }
  }

  async searchMovies({
    query,
    page,
  }: {
    query: string;
    page: number;
  }): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/search/movie`, {
        params: {
          api_key: this.tmbdApiKey,
          page,
          query,
        },
      });
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      this.logger.error('failed to search for movies', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when searching for movies',
      );
    }
  }
}
