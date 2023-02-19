import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

class UpdateBallPositionDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: '123' })
  x: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: '123' })
  y: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: '123' })
  velocityX: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: '123' })
  velocityY: number;
}

export class UpdatePositionDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: '123' })
  paddleY: number;

  @IsOptional()
  @Type(() => UpdateBallPositionDto)
  @ApiPropertyOptional()
  ball?: UpdateBallPositionDto;
}
