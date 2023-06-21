import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StationMetro, User, UserRole, UserSex } from '@project/shared/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {

 /* @Prop({
    type: MongooseSchema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
    type:MongooseSchema.Types.ObjectId,
     default: function () { return new Object()}
  })
  public _id: string;
*/

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserSex,
  })
  public sex: UserSex;


  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole
  })
  public role: UserRole;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: StationMetro
  })
  public location: StationMetro;

  @Prop()
  public backgroundImg: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
