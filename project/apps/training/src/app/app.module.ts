import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { ConfigTrainingModule } from '@project/config/config-training';
import { TrainingInfoModule } from './training-info/training-info.module';


@Module({
  imports: [
    TrainingInfoModule,
    ConfigTrainingModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('application.db')),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
