import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoModule } from './user-info/user-info.module';
import { QuestionnaireCoachModule } from './questionnaire-coach/questionnaire-coach.module';
import { QuestionnaireUserModule } from './questionnaire-user/questionnaire-user.module';


@Module({
  imports: [
    AuthenticationModule,
    UserInfoModule,
    QuestionnaireCoachModule,
    QuestionnaireUserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
