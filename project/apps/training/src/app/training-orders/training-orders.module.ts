import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingOrdersModel, TrainingOrdersSchema } from './training-orders.model';
import { TrainingOrdersRepository } from './training-orders.repository';
import { TrainingInfoModule } from '../training-info/training-info.module';
import { TrainingOrdersController } from './training-orders.controller';
import { TrainingOrdersService } from './training-orders.service';


@Module({
  imports: [
    TrainingInfoModule,
    MongooseModule.forFeature([
    { name: TrainingOrdersModel.name, schema: TrainingOrdersSchema }
  ])
  ],
  controllers: [TrainingOrdersController],
  providers: [TrainingOrdersService, TrainingOrdersRepository],
  exports: [TrainingOrdersRepository, TrainingOrdersService]
})
export class TrainingOrdersModule {}
