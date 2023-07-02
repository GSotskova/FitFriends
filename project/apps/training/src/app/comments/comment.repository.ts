import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/shared-types';
import { DEFAULT_LIST_COUNT_LIMIT, DefaultQuery } from '@project/shared/shared-query';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './comments.model';
import { Model } from 'mongoose';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>) {
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }


  public async findByTrainingId(trainingId: string, query?: DefaultQuery): Promise<Comment[] > {
    const limitNumber = query? query.limit : DEFAULT_LIST_COUNT_LIMIT
    const pageNum = query? (query.page-1) : 0;
    const skip = pageNum*limitNumber ;

    return this.commentModel
      .find({trainingId: trainingId})
      .skip(skip)
      .limit( limitNumber )
      .exec();
  }

}
