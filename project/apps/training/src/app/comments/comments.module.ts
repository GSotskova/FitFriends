import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comment.repository';
import { TrainingInfoModule } from '../training-info/training-info.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './comments.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CommentModel.name, schema: CommentSchema }]),
     TrainingInfoModule
    ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository]
})
export class CommentsModule {}
