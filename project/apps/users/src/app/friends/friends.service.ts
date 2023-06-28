import { ConflictException, Injectable} from '@nestjs/common';
import {  USER_EQ_FRIEND, USER_IS_FRIEND } from './friends.constant';
import { FriendRepository } from './friends.repository';
import { FriendEntity } from './friends.entity';


@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository
  ) {}

  public async create(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new ConflictException(USER_EQ_FRIEND)
    }
    const existsFriend = this.friendRepository.findId( friendId, userId)
    if (existsFriend) {
      throw new ConflictException(USER_IS_FRIEND)
    }
    const friendEntity = new FriendEntity({userId, friendId});
    return this.friendRepository.create(friendEntity);

  }

    public async getFriends(userid: string, limit?: number, page?: number) {
    return this.friendRepository.findByUserId(userid, limit, page);
  }

  public async getUsers(friendId: string, limit?: number, page?: number) {
    return this.friendRepository.findByFriendId(friendId, limit, page);
  }

  public async delete(friendId: string, userId: string) {
    const idFriends = await this.friendRepository.findId(friendId, userId)
    console.log(idFriends)
    return this.friendRepository.destroy(idFriends._id);
  }

}
