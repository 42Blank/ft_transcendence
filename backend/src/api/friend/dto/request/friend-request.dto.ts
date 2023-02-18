// Is this useless?
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { FriendStatus } from '../../../../common/database/entities/friend.entity';

export class FriendRequestDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '친구 요청 받은 유저 고유번호' })
  recvFriendRequestUserId: number;

  @IsEnum(['FRIEND', 'BLOCK'])
  @IsNotEmpty()
  @ApiProperty({ example: 'FRIEND', description: '친구 요청 상태' })
  status: FriendStatus;
}
