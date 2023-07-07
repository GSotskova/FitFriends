import { ConflictException, Injectable } from '@nestjs/common';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { UserSubscriptionDto } from '@project/shared/shared-dto';
import { AUTH_SUBSCRIPT_CONFLICT, AUTH_SUBSCRIPT_EXISTS, AUTH_SUBSCRIPT_NOT_FOUND, AUTH_USER_NOT_FOUND, AUTH_SUB_USER_NOT_FOUND, AUTH_SUBSCRIPT_ROLE_CONFLICT } from './users-subscriptions.constant';
import { UsersSubscriptionsEntity } from './users-subscriptions.entity';
import { UserRepository } from '../user-info/user-info.repository';
import { UserRole } from '@project/shared/shared-types';


@Injectable()
export class UsersSubscriptionsService {
  constructor(
    private readonly usersSubscriptionsRepository: UsersSubscriptionsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(dto: UserSubscriptionDto) {
    if (dto.userId === dto.coachId) {
      throw new ConflictException(AUTH_SUBSCRIPT_CONFLICT);
    }
    const existsUserID = await this.userRepository.findById(dto.userId);
    const existsSubscriptionId = await this.userRepository.findById(dto.coachId);

     if (!existsUserID) {
        return {error: AUTH_USER_NOT_FOUND}
     }
     if (!existsSubscriptionId) {
      return {error: AUTH_SUB_USER_NOT_FOUND}
   }
    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.coachId);
    if (existSubscription) {
      return {error: AUTH_SUBSCRIPT_EXISTS}
    }

    if (existsSubscriptionId.role === UserRole.User) {
      return {error: AUTH_SUBSCRIPT_ROLE_CONFLICT}
    }

    const userEntity = await new UsersSubscriptionsEntity(dto)

    return this.usersSubscriptionsRepository
      .create(userEntity);
  }

  public async delete(dto: UserSubscriptionDto) {
    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.coachId);
    if (!existSubscription) {
      return {error: AUTH_SUBSCRIPT_NOT_FOUND}
    }

    this.usersSubscriptionsRepository
      .delete(dto.userId, dto.coachId);
  }

  public async getByUserId(userId: string) {
    return this.usersSubscriptionsRepository
      .findByUserId(userId);
  }

  public async getByCoachId(coachId: string) {
    return this.usersSubscriptionsRepository
      .findBycoachId(coachId);
  }
}
