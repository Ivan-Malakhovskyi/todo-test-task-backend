import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Response, Request } from 'supertest';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Req....', new Date().toLocaleDateString());
    // console.log('Request', req);
    // console.log('Response', res);
    // console.log('Next', next);
    next();
  }
}
