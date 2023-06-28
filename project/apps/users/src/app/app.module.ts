import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';
import { getMongooseOptions } from '@project/util/util-core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoModule } from './user-info/user-info.module';
import { QuestionnaireCoachModule } from './questionnaire-coach/questionnaire-coach.module';
import { QuestionnaireUserModule } from './questionnaire-user/questionnaire-user.module';
import { FriendModule } from './friends/friends.module';


@Module({
  imports: [
    AuthenticationModule,
    UserInfoModule,
    QuestionnaireCoachModule,
    QuestionnaireUserModule,
    FriendModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
