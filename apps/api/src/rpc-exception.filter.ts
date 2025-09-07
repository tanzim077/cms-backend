import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): void {
    console.log('xx');
    console.log('🚀 ~ catch ~ exception: ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const error = exception.getError();

    // Check if the error is the structured object we expect from our microservices
    if (
      typeof error === 'object' &&
      error !== null &&
      typeof (error as any).status === 'number' &&
      typeof (error as any).message === 'string'
    ) {
      const { status, message } = error as { status: number; message: string };

      // Directly send the HTTP response
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      // Fallback for any other unexpected error format
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
