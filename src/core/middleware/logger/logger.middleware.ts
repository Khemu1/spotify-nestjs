import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const startTime = Date.now();
    console.log(`startTime `, startTime);
    next();
  }
}
