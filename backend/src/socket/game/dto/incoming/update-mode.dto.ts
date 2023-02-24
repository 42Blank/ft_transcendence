import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

enum Mode {
  NORMAL = 'normal',
  RED = 'red',
}

export class UpdateModeDto {
  @IsEnum(Mode)
  @ApiProperty({ example: Mode.NORMAL })
  mode: Mode;
}
