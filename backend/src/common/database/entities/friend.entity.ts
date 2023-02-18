import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';

enum FriendStatus {
  FRIEND = 'FRIEND',
  BLOCK = 'BLOCK',
}

@Entity('friend')
@Unique(['sendFriendRequestUserId', 'recvFriendRequestUserId'])
export class Friend {
  @ApiProperty({ example: 1, description: '친구 요청 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: '친구 요청한 유저 고유번호' })
  @Column({ nullable: false })
  sendFriendRequestUserId: number;

  @ManyToOne(() => User, user => user.recvFriendUsers, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'send_friend_request_user_id', referencedColumnName: 'id' })
  sendFriendRequestUser: User;

  @ApiProperty({ example: 1, description: '친구 요청 받은 유저 고유번호' })
  @Column({ nullable: false })
  recvFriendRequestUserId: number;

  @ManyToOne(() => User, user => user.sendFriendUsers, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'recv_friend_request_user_id', referencedColumnName: 'id' })
  recvFriendRequestUser: User;

  @ApiProperty({ example: 0, description: '친구 요청 상태' })
  @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.FRIEND })
  status: FriendStatus;

  @ApiProperty({ example: new Date(), description: '친구된 시간' })
  @CreateDateColumn()
  createdAt: Date;
}
