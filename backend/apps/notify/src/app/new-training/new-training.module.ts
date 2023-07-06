import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { MailModule } from '../mail/mail.module';
import { NewTrainingModel, NewTrainingSchema } from './new-training.model';
import { NewTrainingService } from './new-training.service';
import { NewTrainingRepository } from './new-training.repository';
import { NewTrainingController } from './new-training.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewTrainingModel.name, schema: NewTrainingSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  controllers: [NewTrainingController],
  providers: [
    NewTrainingService,
    NewTrainingRepository,
    NewTrainingController
  ],
})
export class NewTrainingModule {}
