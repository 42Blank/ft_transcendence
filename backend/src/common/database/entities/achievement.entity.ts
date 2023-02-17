import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAchievement } from './user-achievement.entity';

// DB에 저장되는 값만 조건으로 쓸 수 있음!!
// 1. 첫 게임 승리 :  winCount: 1
// 2. 게임 3번 승리 : winCount: 3
// 3. 연속 3번 게임 승리 : winStreak: 3
// 4. 첫 게임 패배 : loseCount: 1
// 5. 게임 3번 패배 : loseCount: 3
// 6. 연속 3번 게임 패배 : loseStreak: 3
// 7. 첫 친구 추가 : friendCount: 1
// 8. 친구 3명 추가 : friendCount: 3

@Entity('achievement')
export class Achievement {
  @ApiProperty({ example: 1, description: '업적 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '업적 이름', description: '업적 이름' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: '업적 설명', description: '업적 설명' })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({ example: '업적 이미지', description: '업적 이미지' })
  @Column({ nullable: false })
  image: string;

  @ApiPropertyOptional({ example: 1, description: '업적 달성 조건' })
  @Column({ nullable: true })
  winCount?: number;

  @ApiPropertyOptional({ example: 1, description: '업적 달성 조건' })
  @Column({ nullable: true })
  loseCount?: number;

  @ApiPropertyOptional({ example: 1, description: '업적 달성 조건' })
  @Column({ nullable: true })
  winStreak?: number;

  @ApiPropertyOptional({ example: 1, description: '업적 달성 조건' })
  @Column({ nullable: true })
  loseStreak?: number;

  @ApiPropertyOptional({ example: 1, description: '업적 달성 조건' })
  @Column({ nullable: true })
  friendCount?: number;

  @OneToMany(() => UserAchievement, userAchievement => userAchievement.achievement, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  users?: UserAchievement[];
}
