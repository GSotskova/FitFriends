import { Injectable } from '@nestjs/common';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from'@project/shared/shared-dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';


@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {

    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }
}
