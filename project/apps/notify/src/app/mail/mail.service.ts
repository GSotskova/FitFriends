import { Subscriber } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_ADD_NOTIFY_TRAINING_SUBJECT } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.userName}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyNewTraining(email: string, trainingStr: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: EMAIL_ADD_NOTIFY_TRAINING_SUBJECT,
      template: './new-training',
      context: {
        training: `${trainingStr}`,
      }
    })
  }
}
