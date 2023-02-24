import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CheckDuplicateNicknameDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'jasong' })
  nickname: string;
}
