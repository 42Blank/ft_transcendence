import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserJwtAuthGuard } from '../../common/auth/jwt-auth';

@ApiTags('File')
@Controller('file')
@ApiCookieAuth()
@UseGuards(UserJwtAuthGuard)
@ApiUnauthorizedResponse({ description: '로그인이 필요합니다.' })
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
