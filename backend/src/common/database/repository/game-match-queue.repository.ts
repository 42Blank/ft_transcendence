import { Injectable } from '@nestjs/common';

interface GameMatchQueue {
  socketId: string;
  userId: number;
}

@Injectable()
export class GameMatchQueueRepository {
  private gameMatchQueues: GameMatchQueue[] = [];

  public push(socketId: string, userId: number): void {
    this.gameMatchQueues.push({ socketId, userId });
  }

  public pop(): GameMatchQueue | undefined {
    return this.gameMatchQueues.shift();
  }

  public remove(socketId: string): void {
    this.gameMatchQueues.splice(
      this.gameMatchQueues.findIndex(queue => queue.socketId === socketId),
      1,
    );
  }

  public size(): number {
    return this.gameMatchQueues.length;
  }
}
