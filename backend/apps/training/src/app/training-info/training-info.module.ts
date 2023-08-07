import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training-info.model';
import { TrainingRepository } from './training-info.repository';
import { TrainingInfoController } from './training-info.controller';
import { TrainingService } from './training-info.service';
import { NotifyUserModule } from '../notify-user/notify-user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: TrainingModel.name, schema: TrainingSchema }]),
    NotifyUserModule
  ],
  controllers: [TrainingInfoController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingRepository, TrainingService]
})
export class TrainingInfoModule {}
