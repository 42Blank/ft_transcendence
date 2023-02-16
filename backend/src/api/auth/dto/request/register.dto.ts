import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'jasong' })
  nickname: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: 'https://picsum.photos/200' })
  avatar: string;
}
