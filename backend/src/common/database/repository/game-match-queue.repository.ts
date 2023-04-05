import { Injectable, Logger } from '@nestjs/common';

interface GameMatchQueue {
  socketId: string;
  userId: number;
}

@Injectable()
export class GameMatchQueueRepository {
  private readonly logger: Logger = new Logger(GameMatchQueueRepository.name);

  private gameMatchQueues: GameMatchQueue[] = [];

  public push(socketId: string, userId: number): void {
    if (this.gameMatchQueues.find(queue => queue.userId === userId)) {
      return;
    }

    this.gameMatchQueues.push({ socketId, userId });

    this.logger.log(`pushed to game match queue: ${JSON.stringify(this.gameMatchQueues)}`);
  }

  public pop(): GameMatchQueue | undefined {
    const gameMatch = this.gameMatchQueues.shift();

    this.logger.log(
      `popped from game match queue: ${JSON.stringify(this.gameMatchQueues)} ${JSON.stringify(gameMatch)}`,
    );

    return gameMatch;
  }

  public remove(socketId: string): void {
    const gameMatch = this.gameMatchQueues.find(queue => queue.socketId === socketId);
    if (!gameMatch) {
      return;
    }

    this.gameMatchQueues.splice(
      this.gameMatchQueues.findIndex(queue => queue.socketId === socketId),
      1,
    );

    this.logger.log(`removed from game match queue: ${JSON.stringify(this.gameMatchQueues)}`);
  }

  public size(): number {
    return this.gameMatchQueues.length;
  }

  public front(): GameMatchQueue | undefined {
    return this.gameMatchQueues[0];
  }
}
