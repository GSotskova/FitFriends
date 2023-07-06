import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { SeedController } from './seed.controller';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: 'apps/seed/.seed.env'}),
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [ SeedController  ],
  providers: [],
})
export class AppModule {}
