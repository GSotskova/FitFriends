import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/config-users';
import { getMongooseOptions } from '@project/util/util-core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoModule } from './user-info/user-info.module';
import { QuestionnaireCoachModule } from './questionnaire-coach/questionnaire-coach.module';
import { QuestionnaireUserModule } from './questionnaire-user/questionnaire-user.module';
import { FriendModule } from './friends/friends.module';
import { NotifyModule } from './notify/notify.module';
import { TrainingModule } from './training/training.module';
import { NotifyDateModule } from './date-notify/date-notify.module';
import { UsersSubscriptionsModule } from './users-subscriptions/users-subscriptions.module';
import { NotifyUserModule } from './user-notify/user-notify.module';


@Module({
  imports: [
    AuthenticationModule,
    UserInfoModule,
    QuestionnaireCoachModule,
    QuestionnaireUserModule,
    FriendModule,
    ConfigUsersModule,
    NotifyModule,
    NotifyDateModule,
    NotifyUserModule,
    TrainingModule,
    UsersSubscriptionsModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
