import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CommentDto } from '@project/shared/shared-dto';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { DefaultQuery } from '@project/shared/shared-query';


@ApiTags('comments')
@Controller('comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create/:trainingId')
  public async create(@Param('trainingId') trainingId: string, @Body() dto: CommentDto) {
    const newComment = await this.commentsService.createComment(trainingId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment by trainingId found'
  })
  @Get(':trainingId')
  public async showPostId(@Query() query: DefaultQuery, @Param('trainingId') trainingId: string) {
    const comments = await this.commentsService.getTrainingId(trainingId, query);
    return fillObject(CommentRdo, comments);
  }

  @Post('test')
  public async createTestData(@Body() test_data) {
    const dataArr = [];
    for (const key in test_data) {
      const training = await this.commentsService.createTestData(test_data[key]);
    dataArr.push(training);
  }
    return dataArr;
  }

}

