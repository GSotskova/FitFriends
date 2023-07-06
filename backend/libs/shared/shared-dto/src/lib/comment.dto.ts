import { ApiProperty } from "@nestjs/swagger";
import { Max, MaxLength, Min, MinLength } from "class-validator";
import { CommentLenght, CommentRating } from "./dto.constants";

export class CommentDto {

  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(CommentLenght.MinLength)
  @MaxLength(CommentLenght.MaxLength)
  public message: string;

  @ApiProperty({
    description: 'Rating training'
  })
  @Min(CommentRating.MinRating)
  @Max(CommentRating.MaxRating)
  public ratingTraining: number;

  @ApiProperty({
    description: 'Author comment'
  })
  public userId: string;
}
