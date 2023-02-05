import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @ApiProperty({ example: 1, description: '유저 고유번호' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: '80406', description: '인트라 고유 유저 아이디' })
  @Column({ type: 'varchar', length: 42, nullable: false, unique: true })
  intraId!: string;

  @ApiProperty({ example: 'skyrich', description: '유저 닉네임' })
  @Column({ type: 'varchar', length: 42, nullable: false, unique: true })
  nickname!: string;

  @ApiProperty({ example: 'https://picsum.photos/200', description: '유저 아바타 이미지 url' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  avatar!: string;

  @ApiProperty({ example: 0, description: '유저 포인트' })
  @Column({ type: 'int', nullable: false, default: 0 })
  point!: number;

  @ApiProperty({ example: new Date(), description: '유저 생성 시간' })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ example: new Date(), description: '유저 수정 시간' })
  @UpdateDateColumn()
  updatedAt!: Date;
}
