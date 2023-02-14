import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Friend } from './friend.entity';
import { MatchHistory } from './match-history.entity';
import { UserAchievement } from './user-achievement.entity';

@Entity('user')
export class User {
  @ApiProperty({ example: 1, description: '유저 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '80406', description: '인트라 고유 유저 아이디' })
  @Column({ type: 'varchar', length: 42, nullable: false, unique: true })
  intraId: string;

  @ApiProperty({ example: 'skyrich', description: '유저 닉네임' })
  @Column({ type: 'varchar', length: 42, nullable: false, unique: true })
  nickname: string;

  @ApiProperty({ example: 'https://picsum.photos/200', description: '유저 아바타 이미지 url' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  avatar: string;

  @ApiProperty({ example: 0, description: '유저 포인트' })
  @Column({ type: 'int', nullable: false, default: 0 })
  point: number;

  @ApiProperty({ example: new Date(), description: '유저 생성 시간' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: '유저 수정 시간' })
  @UpdateDateColumn()
  updatedAt: Date;

  // 내가 친구 요청 보낸 목록
  @OneToMany(() => Friend, friend => friend.recvFriendRequestUser, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  sendFriendUsers?: Friend[];

  // 남이 친구해달라고 요청온 목록
  @OneToMany(() => Friend, friend => friend.sendFriendRequestUser, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  recvFriendUsers?: Friend[];

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.user, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  achievements?: UserAchievement[];

  @OneToMany(() => MatchHistory, matchHistory => matchHistory.winner, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  winMatchHistory?: MatchHistory[];

  @OneToMany(() => MatchHistory, matchHistory => matchHistory.loser, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  loseMatchHistory?: MatchHistory[];
}

// user 1 : 왓차
// user 2 : 자송

// 왓차 -> 자송한데 친추했음

// friend {
//   sendFriendRequestUser : 왓차
//   recvFriendRequestUser : 자송
// }

// 왓차 {
//   내가 요청한 친구 (sendFriendUsers) : 자송
//   남이 나한테 친구 요청한 사람 (recvFriendUsers) : 없음
// }

// 자송 {
//   내가 요청한 친구 (sendFriendUsers) : 없음
//   남이 나한테 친구 요청한 사람 (recvFriendUsers) : 왓차
// }
