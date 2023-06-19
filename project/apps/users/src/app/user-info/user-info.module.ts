import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user-info.model';
import { UserRepository } from './user-info.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ])],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserInfoModule {}
