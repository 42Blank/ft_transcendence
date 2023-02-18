import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteFriendRequestDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '수신 User 고유번호' })
  recvFriendRequestUserId: number;
}
