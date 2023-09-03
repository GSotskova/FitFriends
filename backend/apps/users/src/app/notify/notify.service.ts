import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { appConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto, NotifyTrainingDto, NotifyUserDto } from'@project/shared/shared-dto';
import { RabbitExchange, RabbitRouting } from '@project/shared/shared-types';


@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(appConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof appConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      RabbitExchange.Notify,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async notifyNewTraining(dto: NotifyTrainingDto) {
    return this.rabbitClient.publish<NotifyTrainingDto>(
      RabbitExchange.Notify,
      RabbitRouting.AddNotifyTraining,
      { ...dto }
    );
  }

  public async notifyUser(dto: NotifyUserDto) {
    return this.rabbitClient.publish<NotifyUserDto>(
      RabbitExchange.Notify,
      RabbitRouting.AddUserNotify,
      { ...dto }
    );
  }
}
