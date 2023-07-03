import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { ConfigTrainingModule } from '@project/config/config-training';
import { TrainingInfoModule } from './training-info/training-info.module';
import { TrainingOrdersModule } from './training-orders/training-orders.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { CommentsModule } from './comments/comments.module';
import { TrainingRequestModule } from './training-request/training-request.module';


@Module({
  imports: [
    TrainingInfoModule,
    TrainingOrdersModule,
    ConfigTrainingModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    SubscribersModule,
    CommentsModule,
    TrainingRequestModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
