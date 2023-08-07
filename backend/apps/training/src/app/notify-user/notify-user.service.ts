import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { trainingConfig } from '@project/config/config-training';
import { ConfigType } from '@nestjs/config';
import { RabbitExchange, RabbitRouting, Training, TrainingRequest } from '@project/shared/shared-types';

@Injectable()
export class NotifyUserService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(trainingConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof trainingConfig>,
  ) {}

  public async trainingNotifyUser(trainingRequest: TrainingRequest) {
    return this.rabbitClient.request<TrainingRequest>(
      {exchange: RabbitExchange.Training,
      routingKey: RabbitRouting.TrainingRequestNotify,
      payload: trainingRequest}
    );
  }

  public async trainingNotify(training: Training) {
    return this.rabbitClient.request<Training>(
      {exchange: RabbitExchange.Training,
      routingKey: RabbitRouting.TrainingNotify,
      payload: training}
    );
  }

}
