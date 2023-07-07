import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CoachAccountController } from './coach-account.controller';
import { UserAccountController } from './user-account.controller';
import { TrainingGeneralController } from './training-general.controller';
import { UploaderController } from './uploader.controller';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: 'apps/bff/.bff.env'}),
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    CoachAccountController,
    UserAccountController,
    TrainingGeneralController,
    UploaderController
  ],
  providers: [
    CheckAuthGuard],
})
export class AppModule {}
