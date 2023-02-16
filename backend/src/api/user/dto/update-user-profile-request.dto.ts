import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserProfileRequestDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'jasong' })
  nickname?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  avatar?: string;
}
