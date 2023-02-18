import { ApiProperty } from '@nestjs/swagger';

export class FtProfileDto {
  @ApiProperty({ example: '80406', description: '인트라 고유 유저 아이디' })
  id: string;

  @ApiProperty({ example: 'ycha', description: '인트라 아이디' })
  username: string;

  @ApiProperty({
    example: 'https://cdn.intra.42.fr/users/default.jpg',
    description: '인트라 프로필 이미지',
  })
  image_url: string;

  @ApiProperty({ example: 'false', description: '등록된 유저인지 유무' })
  isRegistered: boolean;
}
