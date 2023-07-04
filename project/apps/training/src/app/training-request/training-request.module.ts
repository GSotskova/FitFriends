import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingRequestModel, TrainingRequestSchema } from './training-request.model';
import { TrainingRequestController } from './training-request.controller';
import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestService } from './training-request.service';
import { NotifyUserModule } from '../notify-user/notify-user.module';


@Module({
  imports: [
  MongooseModule.forFeature([{ name: TrainingRequestModel.name, schema: TrainingRequestSchema },]),
  NotifyUserModule
  ],
  controllers: [TrainingRequestController],
  providers: [TrainingRequestService, TrainingRequestRepository]
})
export class TrainingRequestModule {}
