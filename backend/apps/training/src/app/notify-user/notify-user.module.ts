import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { NotifyUserService } from './notify-user.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    )
  ],
  providers: [NotifyUserService],
  exports: [NotifyUserService]
})
export class NotifyUserModule {}
