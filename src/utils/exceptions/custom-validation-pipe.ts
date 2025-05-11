import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { CustomHttpException } from './custom.exception';
import { Exception, EXCEPTIONS } from './exceptions';

export class CustomValidationPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const exception = EXCEPTIONS.BAD_REQUEST;
        const responseBody = e.getResponse() as Exception;
        if (responseBody?.message)
          exception.message = responseBody.message as string;
        throw new CustomHttpException(exception);
      }
    }
  }
}
