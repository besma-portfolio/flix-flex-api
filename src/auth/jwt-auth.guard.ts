import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';
import { CustomHttpException } from 'src/utils/exceptions/custom.exception';
import { ErrorMessage, EXCEPTIONS } from 'src/utils/exceptions/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err: { response?: { message?: string } } | null, user): any {
    if (err || !user) {
      const errorMessage: ErrorMessage =
        err?.response?.message ??
        'You need full authentication to access this resource!';
      throw new CustomHttpException(EXCEPTIONS.UNAUTHORIZED, errorMessage);
    }
    return user;
  }
}
