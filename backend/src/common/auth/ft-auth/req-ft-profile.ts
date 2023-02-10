import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type FtProfile = {
  // 인트라 유저 고유 번호
  id: string;

  // 인트라 유저 이름
  username: string;

  // 이미지 주소
  image_url: string;
};

/**
 * @description Request에 담긴 FortyTwoProfile를 가져온다.
 */
export const ReqFtProfile = createParamDecorator((data, ctx: ExecutionContext): FtProfile => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
