import {  Controller, Get, HttpStatus, Param, Post, Query, Req, UseGuards  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { FriendInfoRdo } from '../friends/rdo/friends.rdo';
import { FriendService } from './friends.service';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { NotifyMessage, RequestWithTokenPayload } from '@project/shared/shared-types';
import { DefaultQuery } from '@project/shared/shared-query';
import { NotifyService } from '../notify/notify.service';
import { NotifyUserService } from '../user-notify/user-notify.service';
import { UserService } from '../user-info/user-info.service';


@ApiTags('friends')
@Controller('friends')
export class FriendController {
  constructor(
    private readonly friendService: FriendService,
    private readonly notifyService: NotifyService,
    private readonly notifyUserService: NotifyUserService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add friends'
  })
  @Post('add/:friendId')
  public async create(@Req() { user: payload }: RequestWithTokenPayload, @Param('friendId') friendId: string) {
    const newFriends = await this.friendService.create(payload.sub, friendId);
    await this.notifyUserService.create(newFriends.userId, newFriends.friendId, NotifyMessage.Friend)

    const friend = await this.userService.getUser(newFriends.friendId)
    const currentDate = new Date();
    await this.notifyService.notifyUser({
      userId: friend._id,
      email: friend.email,
      initiatorId: payload.sub,
      initiatorName: payload.userName,
      text: NotifyMessage.Friend,
      dateNotify: currentDate
     })

    return newFriends;
  }

  @UseGuards(JwtAuthGuard)
   @ApiResponse({
    type: FriendInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list friends for user'
  })
  @Get('user')
  public async showFriendsForUser(@Req() { user: payload }: RequestWithTokenPayload, @Query() query: DefaultQuery) {
    const friends = await this.friendService.getFriends(payload.sub, query);
    return fillObject(FriendInfoRdo, friends);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: FriendInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list friends for coach'
  })
  @Get('coach')
  public async showFriendsForCoach(@Req() { user: payload }: RequestWithTokenPayload, @Query() query: DefaultQuery) {
    const friends = await this.friendService.getUsers(payload.sub, query);
    return fillObject(FriendInfoRdo, friends);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: FriendInfoRdo,
    status: HttpStatus.OK,
    description: 'Show friend for user'
  })
  @Get('find/:friendId')
  public async findFriend(@Req() { user: payload }: RequestWithTokenPayload, @Param('friendId') friendId: string) {
    const friends = await this.friendService.findFriend(payload.sub, friendId, payload.role);
    return friends;
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete from friends'
  })
  @Post('delete/coach/:userId')
  public async delete(@Req() { user: payload }: RequestWithTokenPayload, @Param('userId') userId: string) {
    const newFriends = await this.friendService.delete(payload.sub, userId);
    return newFriends;
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete from friends'
  })
  @Post('delete/:friendId')
  public async deleteFriend(@Req() { user: payload }: RequestWithTokenPayload, @Param('friendId') friendId: string) {
    const newFriends = await this.friendService.delete(friendId, payload.sub );
    return newFriends;
  }
}
