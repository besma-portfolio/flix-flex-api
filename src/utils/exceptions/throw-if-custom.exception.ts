import { CustomHttpException } from './custom.exception';
import { Exception } from './exceptions';

export function throwIfCustomHttpException(error: any): void {
  if (error instanceof CustomHttpException)
    throw new CustomHttpException(error.getResponse() as Exception);
}
