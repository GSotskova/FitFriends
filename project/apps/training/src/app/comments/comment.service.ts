import { Injectable } from '@nestjs/common';
import { CommentDto } from '@project/shared/shared-dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { DefaultQuery } from '@project/shared/shared-query';
import { TrainingRepository } from '../training-info/training-info.repository';
import { TRANING_NOT_FOUND } from '../training-info/training-info.constant';


@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly trainingRepository: TrainingRepository,
  ) {}

  public async createComment(trainingId: string, dto: CommentDto) {
    const commentEntity = await new CommentEntity({...dto, trainingId})
    const existTraining = await this.trainingRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    const newComment = await this.commentRepository.create(commentEntity);
    const allComments = await this.commentRepository.findByTrainingId(newComment.trainingId);
    const allRatings = allComments.map((el)=>el.ratingTraining);
    const newRating = Math.floor(allRatings.reduce((a,b)=>a+b)/allRatings.length);
    await this.trainingRepository.updateRating(newComment.trainingId, newRating);
    return newComment
  }

  public async getTrainingId(trainingId :string, query: DefaultQuery) {
    const existTraining = await this.trainingRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRANING_NOT_FOUND}
    }
    return this.commentRepository.findByTrainingId(trainingId, query);
  }

}
