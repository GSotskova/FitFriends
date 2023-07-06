import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireUserModel, QuestionnaireUserSchema } from './questionnaire-user.model';
import { QuestionnaireUserRepository } from './questionnaire-user.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: QuestionnaireUserModel.name, schema: QuestionnaireUserSchema }
  ])],
  providers: [QuestionnaireUserRepository],
  exports: [QuestionnaireUserRepository]
})
export class QuestionnaireUserModule {}
