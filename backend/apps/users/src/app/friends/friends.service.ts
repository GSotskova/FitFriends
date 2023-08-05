import { ConflictException, Injectable} from '@nestjs/common';
import {  USER_EQ_FRIEND, USER_IS_FRIEND, FRIENDS_NOT_FOUND } from './friends.constant';
import { FriendRepository } from './friends.repository';
import { FriendEntity } from './friends.entity';
import { DefaultQuery } from '@project/shared/shared-query';
import { UserRole } from '@project/shared/shared-types';


@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository
  ) {}

  public async create(userId: string, friendId: string) {
    if (userId === friendId) {
    //  return {error: USER_EQ_FRIEND}
      throw new ConflictException(USER_EQ_FRIEND)
    }
    const existsFriend = await this.friendRepository.findId( friendId, userId)
    if (existsFriend) {
      //return {error: USER_IS_FRIEND}
      throw new ConflictException(USER_IS_FRIEND)
    }
    const friendEntity = new FriendEntity({userId, friendId});
    return this.friendRepository.create(friendEntity);

  }

    public async getFriends(userid: string, query: DefaultQuery) {
    return this.friendRepository.findByUserId(userid, query);
  }

  public async getUsers(friendId: string, query: DefaultQuery) {
    return this.friendRepository.findByFriendId(friendId, query);
  }

  public async delete(friendId: string, userId: string) {
    const idFriends = await this.friendRepository.findId(friendId, userId)
    if (!idFriends) {
      return {error: FRIENDS_NOT_FOUND}
    }
    return this.friendRepository.destroy(idFriends._id);
  }

  public async findFriend(userId: string, friendId: string, role: UserRole) {
    if (role === UserRole.User) {
      const friendUser = await this.friendRepository.findId(friendId, userId)
      if (!friendUser) {
        return {error: FRIENDS_NOT_FOUND}
      }
      return friendUser;
    }
    
    const friendCoach = await this.friendRepository.findId(userId, friendId)
    if (!friendCoach) {
      return {error: FRIENDS_NOT_FOUND}
    }
    return friendCoach;
  }
}
