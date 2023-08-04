import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/shared-types';
import { DefaultQuery } from '@project/shared/shared-query';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './comments.model';
import { Model } from 'mongoose';
import { getDefaultQuery } from '@project/util/util-core';

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
    if(query) {
        const objQuery= getDefaultQuery(query)

        return this.commentModel
          .find({trainingId: trainingId})
          .sort(objQuery.objSort)
          .skip(objQuery.skip)
          .limit(objQuery.limitNumber + objQuery.limitNumber)
          .exec();
    }
    return this.commentModel.find({trainingId: trainingId}).exec();
    }

}
