import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitExchange, RabbitQueue, RabbitRouting } from '@project/shared/shared-types';
import { CreateSubscriberDto } from'@project/shared/shared-dto';
import { MailService } from '../mail/mail.service';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: RabbitExchange.Notify,
    routingKey: RabbitRouting.AddSubscriber,
    queue: RabbitQueue.Subscriber,
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
