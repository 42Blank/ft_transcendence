import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { TypeORMError } from 'typeorm/error/TypeORMError';

const FIND_DOUBLE_QUOTE = /\"/g;

@Catch()
export class WsExceptionFilter implements ExceptionFilter {
  private logger = new Logger(WsExceptionFilter.name);

  public catch(exception: Error, host: ArgumentsHost) {
    const socket: Socket = host.switchToWs().getClient();

    if (exception instanceof EntityNotFoundError) {
      const error = new NotFoundException(`NotFound Error : ${this.getErrorMessage(exception)}`);
      return this.responseError(socket, error);
    }

    if (exception instanceof TypeORMError) {
      const error = new ServiceUnavailableException(`TypeOrm Error : ${this.getErrorMessage(exception)}`);
      return this.responseError(socket, error);
    }

    if (exception instanceof HttpException) {
      return this.responseError(socket, exception);
    }

    this.logger.error('WsException', exception);

    const error = new InternalServerErrorException(`Unknown Error : ${this.getErrorMessage(exception)}`);
    return this.responseError(socket, error);
  }

  private getErrorMessage(exception: Error) {
    return exception.message.replace(FIND_DOUBLE_QUOTE, '');
  }

  private responseError(socket: Socket, exception: Error) {
    socket.emit('exception', {
      name: exception.name,
      message: exception.message,
    });
  }
}
