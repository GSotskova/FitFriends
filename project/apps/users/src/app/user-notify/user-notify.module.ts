import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyUserModel, NotifyUserSchema } from './user-notify.model';
import { NotifyUserRepository } from './user-notify.repository';
import { NotifyUserService } from './user-notify.service';


@Module({
  imports: [MongooseModule.forFeature([
    { name: NotifyUserModel.name, schema: NotifyUserSchema }
  ])],
  providers: [NotifyUserRepository, NotifyUserService],
  exports: [NotifyUserRepository, NotifyUserService]
})
export class NotifyUserModule {}
