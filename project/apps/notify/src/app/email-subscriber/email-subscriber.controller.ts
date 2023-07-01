import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/shared-types';
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
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.notify.subscriber',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
