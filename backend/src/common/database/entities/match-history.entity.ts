import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('match_history')
export class MatchHistory {
  @ApiProperty({ example: 1, description: '경기 고유번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: '이긴 사람' })
  @Column({ nullable: false })
  winnerId: number;

  @ManyToOne(() => User, user => user.winMatchHistory, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'winner_id', referencedColumnName: 'id' })
  winner: User;

  @ApiProperty({ example: 1, description: '진 사람' })
  @Column({ nullable: false })
  loserId: number;

  @ManyToOne(() => User, user => user.loseMatchHistory, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'loser_id', referencedColumnName: 'id' })
  loser: User;

  @ApiProperty({ example: new Date(), description: '친구된 시간' })
  @CreateDateColumn()
  createdAt: Date;
}
