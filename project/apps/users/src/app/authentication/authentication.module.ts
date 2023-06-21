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

@Module({
  imports: [
    UserInfoModule,
    QuestionnaireCoachModule,
    QuestionnaireUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule
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
