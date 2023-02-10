import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwtPayload';

/**
 * @description Request에 담긴 User를 가져온다.
 */
export const ReqJwtPayload = createParamDecorator((data, ctx: ExecutionContext): JwtPayload => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
