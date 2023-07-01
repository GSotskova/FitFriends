import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { TrainingForSend, RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class TrainingService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async getOrders(userId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.training',
      routingKey: RabbitRouting.GetOrders,
      payload: userId}
    );
  }

  public async geNewtTraining(dataNotifyTraining) : Promise<TrainingForSend[]> {
    return this.rabbitClient.request(
      {exchange: 'fitfriends.training',
      routingKey: RabbitRouting.GeNewtTraining,
      payload: dataNotifyTraining}
    );
  }
}
