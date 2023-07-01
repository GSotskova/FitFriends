import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training-info.model';
import { TrainingRepository } from './training-info.repository';
import { TrainingInfoController } from './training-info.controller';
import { TrainingService } from './training-info.service';
import { SubscribersModule } from '../subscribers/subscribers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: TrainingModel.name, schema: TrainingSchema }]),
    SubscribersModule
  ],
  controllers: [TrainingInfoController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingRepository, TrainingService]
})
export class TrainingInfoModule {}
