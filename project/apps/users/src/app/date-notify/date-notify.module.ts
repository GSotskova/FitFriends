import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyDateModel, NotifyDateSchema } from './date-notify.model';
import { NotifyDateRepository } from './date-notify.repository';


@Module({
  imports: [MongooseModule.forFeature([
    { name: NotifyDateModel.name, schema: NotifyDateSchema }
  ])],
  providers: [NotifyDateRepository],
  exports: [NotifyDateRepository]
})
export class NotifyDateModule {}
