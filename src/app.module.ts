import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './providers/DevConfigService';
import { PhotoModule } from './playlist/playlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';

const devConfig = {
  port: 3000,
};

const prodConfig = {
  port: 4000,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      database: 'spotify-clone',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      entities: [Song],
      synchronize: true,
    }),
    CatsModule,
    SongsModule,
  ],
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
  constructor(dataSource: DataSource) {
    console.log('Connect to DB with name', dataSource.driver.database);
  }

  configure(consumer: MiddlewareConsumer) {
    //* consumer.apply(LoggerMiddleware).forRoutes('songs'); first USAGE
    //* consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.GET }); second USAGE

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
