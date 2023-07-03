import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import {  RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class ImgTrainingService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(uploaderConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof uploaderConfig>,
  ) {}

  public async trainingImg(trainingId:string, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.TrainingImg,
      payload: {trainingId, fileId}}
    );
  }

  public async trainingVideo(trainingId:string, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.TrainingVideo,
      payload: {trainingId, fileId}}
    );
  }

}
