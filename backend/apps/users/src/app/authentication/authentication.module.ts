import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserInfoModule } from '../user-info/user-info.module';
import { QuestionnaireCoachModule } from '../questionnaire-coach/questionnaire-coach.module';
import { QuestionnaireUserModule } from '../questionnaire-user/questionnaire-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { NotifyModule } from '../notify/notify.module';
import { TrainingModule } from '../training/training.module';
import { NotifyDateModule } from '../date-notify/date-notify.module';
import { UsersSubscriptionsModule } from '../users-subscriptions/users-subscriptions.module';

@Module({
  imports: [
    UserInfoModule,
    QuestionnaireCoachModule,
    QuestionnaireUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule,
    NotifyModule,
    TrainingModule,
    NotifyDateModule,
    UsersSubscriptionsModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthenticationModule {}
