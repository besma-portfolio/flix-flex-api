import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';
import { EXCEPTIONS } from 'src/utils/exceptions/exceptions';

@Injectable()
export class TvShowsService {
  private readonly logger = new Logger(TvShowsService.name);
  private tmbdApiKey: string;
  private tmbdApiUrl: string;

  constructor(private configService: ConfigService) {
    this.tmbdApiKey = this.configService.get<string>('THEMOVIEDB_API_KEY') ?? '';
    this.tmbdApiUrl = this.configService.get<string>('THEMOVIEDB_URL') ?? '';
  }

  async getPopularTvShows(page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/tv/popular`, {
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
      this.logger.error('failed to get popular tv shows', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when getting popular tv shows',
      );
    }
  }

  async getTopRatedTvShows(page: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/tv/top_rated`, {
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
      this.logger.error('failed to get top rated tv shows', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when getting top rated tv shows',
      );
    }
  }

  async getTvShowDetails(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/tv/${id}`, {
        params: {
          api_key: this.tmbdApiKey,
          append_to_response: 'videos',
        },
      });
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      this.logger.error('failed to get tv show details', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when getting tv show details',
      );
    }
  }

  async searchTvShows({
    query,
    page,
  }: {
    query: string;
    page: number;
  }): Promise<any> {
    try {
      const response = await axios.get(`${this.tmbdApiUrl}/search/tv`, {
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
      this.logger.error('failed to search for tv shows', error);
      throw new CustomHttpException(
        EXCEPTIONS.SERVER_ERROR,
        'Something went wrong when searching for tv shows',
      );
    }
  }
}
