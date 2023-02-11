import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSocketRepository {
  private readonly userSocketMap: Map<string, number> = new Map();

  public addUserSocketMap(userId: number, socketId: string): void {
    this.userSocketMap.set(socketId, userId);
  }

  public removeUserSocketMap(socketId: string): void {
    this.userSocketMap.delete(socketId);
  }
}
