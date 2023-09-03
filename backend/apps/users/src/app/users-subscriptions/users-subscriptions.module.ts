import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSubscriptionsModel, UsersSubscriptionsSchema } from './users-subscriptions.model';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { UsersSubscriptionsService } from './users-subscriptions.service';
import { UsersSubscriptionsController } from './users-subscriptions.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UsersSubscriptionsModel.name, schema: UsersSubscriptionsSchema }
  ]),

  RabbitMQModule.forRootAsync(
    RabbitMQModule,
    getRabbitMQOptions('application.rabbit')
  ),
  NotifyModule],
  controllers: [UsersSubscriptionsController],
  providers: [UsersSubscriptionsService, UsersSubscriptionsRepository],
  exports: [UsersSubscriptionsService]
})
export class UsersSubscriptionsModule {}
