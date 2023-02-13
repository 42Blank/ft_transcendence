import { Injectable } from '@nestjs/common';
import { OnlineUserRepository } from '../repository/online-user.repository';

@Injectable()
export class OnlineUserService {
  constructor(private readonly onlineUserRepository: OnlineUserRepository) {}

  public addOnlineUser(userId: number, socketId: string): void {
    this.onlineUserRepository.addOnlineUser(userId, socketId);
  }

  public removeOnlineUser(userId: number, socketId: string): void {
    this.onlineUserRepository.removeOnlineUser(userId, socketId);
  }

  public getOnlineUser(): number[] {
    return this.onlineUserRepository.getOnlineUser();
  }
}
