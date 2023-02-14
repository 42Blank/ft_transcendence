import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  roomTitle: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  @ApiProperty({ example: false })
  isPrivate: boolean;

  @IsString()
  @ValidateIf(o => o.isPrivate)
  @IsNotEmpty()
  @ApiProperty({ example: 'asdf' })
  password?: string;
}
