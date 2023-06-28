import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendModel, FriendsSchema } from './friends.model';
import { FriendController } from './friends.controller';
import { FriendRepository } from './friends.repository';
import { FriendService } from './friends.service';
import { UserInfoModule } from '../user-info/user-info.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: FriendModel.name, schema: FriendsSchema }
  ]),
  UserInfoModule],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository]
})
export class FriendModule {}
