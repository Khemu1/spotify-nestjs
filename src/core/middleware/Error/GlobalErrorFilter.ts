import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from './CustomError';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isDev = process.env.NODE_ENV === 'development';
    console.error(exception); // Log the error

    // Handle custom business logic errors
    if (exception instanceof CustomError) {
      console.log('error is instanceof CustomError');
      const { statusCode, status, message, type, safe, details, errors } =
        exception;

      return response
        .status(statusCode)
        .json(
          isDev || safe
            ? { status, message, type, details, errors }
            : { status: 'error', message: 'Something went wrong!' },
        );
    }

    // Handle NestJS validation errors (DTO errors)
    if (exception instanceof BadRequestException) {
      console.log('error is instanceof BadRequestException');
      const statusCode = exception.getStatus();
      const responseBody = exception.getResponse();

      let message = 'Validation failed';
      let errors: any[] = [];

      // Extract validation errors
      if (typeof responseBody === 'object' && responseBody !== null) {
        const res = responseBody as { message?: string[] | string };
        if (Array.isArray(res.message)) {
          errors = res.message; // Extract validation error messages
        } else {
          message = res.message || message;
        }
      }

      return response.status(statusCode).json({
        status: 'fail',
        message,
        errors,
      });
    }

    // Handle other NestJS HTTP exceptions
    if (exception instanceof HttpException) {
      console.log('error is instanceof HttpException');
      const statusCode = exception.getStatus();
      const message = exception.message;

      return response.status(statusCode).json({ status: 'fail', message });
    }

    // Handle unknown errors
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
