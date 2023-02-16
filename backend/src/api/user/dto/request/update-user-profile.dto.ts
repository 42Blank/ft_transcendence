import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileRequestDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'jasong' })
  nickname?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'https://picsum.photos/200' })
  avatar?: string;
}
