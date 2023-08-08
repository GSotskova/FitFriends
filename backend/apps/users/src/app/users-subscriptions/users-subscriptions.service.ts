import { ConflictException, Injectable } from '@nestjs/common';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { UserSubscriptionDto } from '@project/shared/shared-dto';
import { AUTH_SUBSCRIPT_CONFLICT, AUTH_SUBSCRIPT_EXISTS, AUTH_SUBSCRIPT_NOT_FOUND, /*AUTH_USER_NOT_FOUND, AUTH_SUB_USER_NOT_FOUND, AUTH_SUBSCRIPT_ROLE_CONFLICT*/ } from './users-subscriptions.constant';
import { UsersSubscriptionsEntity } from './users-subscriptions.entity';



@Injectable()
export class UsersSubscriptionsService {
  constructor(
    private readonly usersSubscriptionsRepository: UsersSubscriptionsRepository,
  ) {}

  public async create(dto: UserSubscriptionDto) {
    if (dto.userId === dto.coachId) {
      throw new ConflictException(AUTH_SUBSCRIPT_CONFLICT);
    }

    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.coachId);
    if (existSubscription) {
      return {error: AUTH_SUBSCRIPT_EXISTS}
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

  public async getById(userId: string, coachId: string) {
    return this.usersSubscriptionsRepository
      .findSubscriptionByUserId(userId, coachId);
  }

  public async getByCoachId(coachId: string) {
    return this.usersSubscriptionsRepository
      .findBycoachId(coachId);
  }
}
