import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    let status = 500;

    switch (exception.constructor) {
      case EntityNotFoundError:
        status = 404;
        break;
    }

    const response = host.switchToHttp().getResponse();
    response.status(status).json({ message: exception.message });
  }
}
