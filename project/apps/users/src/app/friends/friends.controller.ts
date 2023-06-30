import {  Controller, Get, HttpStatus, Param, Post, Query, Req, UseGuards  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { UserInfoRdo } from '../user-info/rdo/user-info.rdo';
import { FriendService } from './friends.service';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from '@project/shared/shared-types';
import { DefaultQuery } from '@project/shared/shared-query';


@ApiTags('friends')
@Controller('friends')
export class FriendController {
  constructor(
    private readonly friendService: FriendService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add friends'
  })
  @Post('add/:friendId')
  public async create(@Req() { user: payload }: RequestWithTokenPayload, @Param('friendId') friendId: string) {
    console.log(payload.sub, friendId)
    const newFriends = await this.friendService.create(payload.sub, friendId);
    return newFriends;
  }

  @UseGuards(JwtAuthGuard)
   @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list friends for user'
  })
  @Get('')
  public async showFriendsForUser(@Req() { user: payload }: RequestWithTokenPayload, @Query() query: DefaultQuery) {
    const friends = await this.friendService.getFriends(payload.sub, query.limit, query.page);
    return fillObject(UserInfoRdo, friends);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list friends for coach'
  })
  @Get('coach')
  public async showFriendsForCoach(@Req() { user: payload }: RequestWithTokenPayload, @Query() query: DefaultQuery) {
    const friends = await this.friendService.getUsers(payload.sub, query.limit, query.page);
    return fillObject(UserInfoRdo, friends);
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
    const newFriends = await this.friendService.delete(payload.sub, friendId);
    return newFriends;
  }
}
