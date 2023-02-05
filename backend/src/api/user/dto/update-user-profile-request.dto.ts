import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserProfileRequestDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'jasong' })
  nickname?: string;
}
