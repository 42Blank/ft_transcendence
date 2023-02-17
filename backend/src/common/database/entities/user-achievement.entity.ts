import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Achievement } from './achievement.entity';
import { User } from './user.entity';

@Entity('user_achievement')
export class UserAchievement {
  @ApiProperty({ example: 1, description: '업적 달성 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: '업적 달성한 유저' })
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, user => user.recvFriendUsers, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ApiProperty({ example: 1, description: '유저가 달성한 업적' })
  @Column({ nullable: false })
  achievementId: number;

  @ManyToOne(() => User, user => user.recvFriendUsers, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'achievement_id', referencedColumnName: 'id' })
  achievement: Achievement;

  @ApiProperty({ example: new Date(), description: '업적 달성한 시간' })
  @CreateDateColumn()
  createdAt: Date;
}
