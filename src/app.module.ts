import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './modules/songs/songs.module';
import { LoggerMiddleware } from './core/middleware/logger/logger.middleware';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load environment variables
    SongsModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs'); //  middleware to /songs
    // consumer.apply(LoggerMiddleware).forRoutes({ path: 'songs', method: RequestMethod.POST }); // ✅ Apply only to POST /songs
  }
}
