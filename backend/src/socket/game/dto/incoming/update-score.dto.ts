import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

enum Winner {
  HOST = 'host',
  CHALLENGER = 'challenger',
}

export class UpdateScoreDto {
  @IsEnum(Winner)
  @ApiProperty({ example: Winner.HOST })
  winner: Winner;
}
