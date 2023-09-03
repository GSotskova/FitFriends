import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { TrainingService } from './training.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    )
  ],
  providers: [TrainingService],
  exports: [TrainingService]
})
export class TrainingModule {}
