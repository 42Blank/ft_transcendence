import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ example: 'jasong' })
  nickname: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  @ApiProperty({ example: 'https://picsum.photos/200' })
  avatar: string;
}
