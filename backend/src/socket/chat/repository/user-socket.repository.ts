import { Injectable } from '@nestjs/common';
import { User } from '../../../common/database/entities/user.entity';

@Injectable()
export class UserSocketRepository {
  private readonly userSocketMap: Map<User['id'], string> = new Map();

  public addUserSocketMap(userId: number, socketId: string): void {
    this.userSocketMap.set(userId, socketId);
  }

  public removeUserSocketMap(userId: number): void {
    this.userSocketMap.delete(userId);
  }

  public getSocketIdByUser(userId: number): string {
    return this.userSocketMap.get(userId);
  }
}
