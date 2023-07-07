import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user-info.model';
import { UserRepository } from './user-info.repository';
import { UserInfoController } from './user-info.controller';
import { UserService } from './user-info.service';
import { QuestionnaireCoachModule } from '../questionnaire-coach/questionnaire-coach.module';
import { QuestionnaireUserModule } from '../questionnaire-user/questionnaire-user.module';
import { NotifyUserModule } from '../user-notify/user-notify.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ]),
  QuestionnaireCoachModule,
  QuestionnaireUserModule,
  NotifyUserModule,
  NotifyModule,
  ],
  controllers: [UserInfoController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService]
})
export class UserInfoModule {}
