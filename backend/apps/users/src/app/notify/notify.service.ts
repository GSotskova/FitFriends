import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto, NotifyTrainingDto, NotifyUserDto } from'@project/shared/shared-dto';
import { RabbitRouting } from '@project/shared/shared-types';


@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async notifyNewTraining(dto: NotifyTrainingDto) {
    return this.rabbitClient.publish<NotifyTrainingDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddNotifyTraining,
      { ...dto }
    );
  }

  public async notifyUser(dto: NotifyUserDto) {
    return this.rabbitClient.publish<NotifyUserDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddUserNotify,
      { ...dto }
    );
  }
}
