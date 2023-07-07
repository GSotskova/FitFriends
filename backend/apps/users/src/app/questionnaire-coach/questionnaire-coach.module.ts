import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireCoachModel, QuestionnaireCoachSchema } from './questionnaire-coach.model';
import { QuestionnaireCoachRepository } from './questionnaire-coach.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: QuestionnaireCoachModel.name, schema: QuestionnaireCoachSchema }
  ])],
  providers: [QuestionnaireCoachRepository],
  exports: [QuestionnaireCoachRepository]
})
export class QuestionnaireCoachModule {}
