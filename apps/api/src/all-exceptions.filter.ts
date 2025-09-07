import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch() // This decorator makes the filter global for all unhandled exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Case 1: The exception is a standard HttpException from within the API gateway itself.
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = (exceptionResponse as any).message || exception.message;
    } 
    // Case 2: The exception is the plain object from our microservice, as confirmed by our logs.
    else if (
      typeof exception === 'object' &&
      exception !== null &&
      'status' in exception &&
      'message' in exception
    ) {
      const error = exception as { status: number; message: string };
      status = error.status;
      message = error.message;
    }

    // Send the final, correctly formatted HTTP response
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
