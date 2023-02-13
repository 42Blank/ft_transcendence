import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineUserRepository {
  private readonly onlineUser: Map<number, Set<string>> = new Map();

  public addOnlineUser(userId: number, socketId: string): void {
    if (!this.onlineUser.has(userId)) {
      this.onlineUser.set(userId, new Set());
    }

    this.onlineUser.get(userId).add(socketId);
  }

  public removeOnlineUser(userId: number, socketId: string): void {
    if (!this.onlineUser.has(userId)) {
      return;
    }

    this.onlineUser.get(userId).delete(socketId);

    if (this.onlineUser.get(userId).size === 0) {
      this.onlineUser.delete(userId);
    }
  }

  public getOnlineUser(): number[] {
    return Array.from(this.onlineUser.keys());
  }
}
