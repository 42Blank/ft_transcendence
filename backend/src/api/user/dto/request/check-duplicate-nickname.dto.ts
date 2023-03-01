import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CheckDuplicateNicknameDto {
  @IsString()
  @MinLength(1)
  @Trim()
  @ApiProperty({ example: 'jasong' })
  nickname: string;
}
