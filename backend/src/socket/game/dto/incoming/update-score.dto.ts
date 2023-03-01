import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

enum Winner {
  HOST = 'host',
  CHALLENGER = 'challenger',
}

export class UpdateScoreDto {
  @IsEnum(Winner)
  @IsOptional()
  @ApiPropertyOptional({ example: Winner.HOST })
  winner?: Winner;
}
