import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitExchange, RabbitQueue, RabbitRouting } from '@project/shared/shared-types';
import { MailService } from '../mail/mail.service';
import { UserNotifyService } from './user-notify.service';
import { NotifyUserDto } from '@project/shared/shared-dto';

@Controller()
export class UserNotifyController {
  constructor(
    private readonly userNotifyService: UserNotifyService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: RabbitExchange.Notify,
    routingKey: RabbitRouting.AddUserNotify,
    queue: RabbitQueue.NotifyUser,
  })
  public async create(dto: NotifyUserDto) {
    this.userNotifyService.addNotifyUser(dto);
    const notifyStr = dto.text+dto.initiatorName;
    this.mailService.sendNotifyUser(dto.email, notifyStr);


  }
}
