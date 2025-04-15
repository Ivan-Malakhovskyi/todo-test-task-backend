import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './providers/DevConfigService';
import { PhotoModule } from './playlist/playlist.module';

const devConfig = {
  port: 3000,
};

const prodConfig = {
  port: 4000,
};

@Module({
  imports: [CatsModule, SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    PhotoModule,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //* consumer.apply(LoggerMiddleware).forRoutes('songs'); first USAGE
    //* consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.GET }); second USAGE

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
