import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FriendStatus } from '../../../../common/database/entities/friend.entity';

export class UpdateFriendRequestDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '친구 요청 받은 유저 고유번호'})
  recvFriendRequestUserId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({example: '2', description: '친구 요청한 유저 고유번호'})
  sendFriendRequestUserId: number;

  @IsEnum(['FRIEND', 'BLOCK'])
  @IsNotEmpty()
  @ApiProperty({example: 'FRIEND', description: '친구 요청 상태'})
  status: FriendStatus;
}