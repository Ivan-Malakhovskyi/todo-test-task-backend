import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,

    @Inject('CONFIG')
    private config: { port: string },
  ) {}
  getHello(): string {
    return `Hello, you can look at me on the root page ${this.devConfigService.getDB_HOST()} PORT IS ${this.config.port}`;
  }
}
