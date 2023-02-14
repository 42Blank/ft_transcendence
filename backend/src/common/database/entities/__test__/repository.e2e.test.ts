import { Injectable, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../../../../app.module';
import { MatchHistory } from '../match-history.entity';
import { User } from '../user.entity';

// yarn exec jest 'src/common/database/entities/__test__/repository.e2e.test.ts'

@Injectable()
class TestService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>,
  ) {}

  async test() {
    const user1 = await this.userRepository.save({
      intraId: createRandomString(5),
      nickname: createRandomString(10),
      avatar: 'test',
    });

    const user2 = await this.userRepository.save({
      intraId: createRandomString(5),
      nickname: createRandomString(10),
      avatar: 'test',
    });

    await this.matchHistoryRepository.save({
      winnerId: user1.id,
      loserId: user2.id,
    });

    const user = await this.userRepository.find({
      where: { id: user1.id },
      relations: ['winMatchHistory'], // 가져오고 싶은거만 가져옴
    });

    console.warn(JSON.stringify(user, null, 2));
  }
}

@Injectable()
class TestController {
  constructor(private readonly testService: TestService) {}

  async test() {
    await this.testService.test();
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([User, MatchHistory])],
  providers: [TestService],
  controllers: [TestController],
})
class TestModule {}

jest.setTimeout(50000);
describe('RepositoryE2e', () => {
  it('성공', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    const testService = moduleRef.get<TestService>(TestService);

    await testService.test();
  });
});

function createRandomString(len: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = len; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}
