import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { MailModule } from '../mail/mail.module';
import { UserNotifyModel, UserNotifySchema } from './user-notify.model';
import { UserNotifyService } from './user-notify.service';
import { UserNotifyRepository } from './user-notify.repository';
import { UserNotifyController } from './user-notify.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotifyModel.name, schema: UserNotifySchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  controllers: [UserNotifyController],
  providers: [
    UserNotifyService,
    UserNotifyRepository,
    UserNotifyController
  ],
})
export class UserNotifyModule {}
