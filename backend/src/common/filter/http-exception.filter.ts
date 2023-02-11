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
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { TypeORMError } from 'typeorm/error/TypeORMError';

const FIND_DOUBLE_QUOTE = /\"/g;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  public catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof EntityNotFoundError) {
      const error = new NotFoundException(`NotFound Error : ${this.getErrorMessage(exception)}`);
      return this.responseError(response, error);
    }

    if (exception instanceof TypeORMError) {
      const error = new ServiceUnavailableException(`TypeOrm Error : ${this.getErrorMessage(exception)}`);
      return this.responseError(response, error);
    }

    if (exception instanceof HttpException) {
      return this.responseError(response, exception);
    }

    this.logger.error('HttpException', exception);

    const error = new InternalServerErrorException(`Unknown Error : ${this.getErrorMessage(exception)}`);
    return this.responseError(response, error);
  }

  private getErrorMessage(exception: Error) {
    return exception.message.replace(FIND_DOUBLE_QUOTE, '');
  }

  private responseError(response: Response, exception: Error) {
    return response.status((exception as HttpException).getStatus()).json((exception as HttpException).getResponse());
  }
}
