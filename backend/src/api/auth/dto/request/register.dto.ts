import { Trim } from '@miaooo/class-transformer-trim';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(8)
  @Trim()
  @ApiProperty({ example: 'jasong' })
  nickname: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty({ example: 'https://picsum.photos/200' })
  avatar: string;
}
