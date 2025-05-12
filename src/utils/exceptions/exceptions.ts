import { HttpStatus } from '@nestjs/common';

export type ErrorMessage = string | string[];
export interface Exception {
  errorCode: string;
  statusCode: HttpStatus;
  message: ErrorMessage;
  data?: any;
}

export const EXCEPTIONS = {
  NOT_FOUND: <Exception>{
    statusCode: HttpStatus.NOT_FOUND,
    message: 'the specified record has not been found',
    errorCode: 'NOT_FOUND',
  },
  UNAUTHORIZED: <Exception>{
    statusCode: HttpStatus.UNAUTHORIZED,
    message:
      'lacks of valid authentication credentials for the target resource',
    errorCode: 'UNAUTHORIZED',
  },
  BAD_REQUEST: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid request',
    errorCode: 'BAD_REQUEST',
  },
  EXISTING_USERNAME: <Exception>{
    statusCode: HttpStatus.CONFLICT,
    message: 'this username has already been used',
    errorCode: 'EXISTING_USERNAME',
  },
  INVALID_CREDENTIALS: <Exception>{
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid credentials',
    errorCode: 'INVALID_CREDENTIALS',
  },
  SERVER_ERROR: <Exception>{
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong. Please try again',
    errorCode: 'SERVER_ERROR',
  },
};
