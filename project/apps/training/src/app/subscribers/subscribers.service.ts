import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { trainingConfig } from '@project/config/config-training';
import { ConfigType } from '@nestjs/config';
import {  Training, RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class SubscribersService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(trainingConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof trainingConfig>,
  ) {}

  public async trainingSuscribers(training: Training) {
    return this.rabbitClient.request<Training>(
      {exchange: 'fitfriends.trainings',
      routingKey: RabbitRouting.TrainingForSuscribers,
      payload: training}
    );
  }


}
