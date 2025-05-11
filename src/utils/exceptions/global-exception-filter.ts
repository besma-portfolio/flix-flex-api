import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { EXCEPTIONS, Exception } from './exceptions';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : EXCEPTIONS.SERVER_ERROR.statusCode;

    const responseBody: Exception =
      exception instanceof HttpException
        ? (exception.getResponse() as Exception)
        : EXCEPTIONS.SERVER_ERROR;

    if (!responseBody.errorCode)
      responseBody.errorCode = EXCEPTIONS.SERVER_ERROR.errorCode;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
