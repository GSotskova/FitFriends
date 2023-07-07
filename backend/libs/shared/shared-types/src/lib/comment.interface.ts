export interface Comment {
  _id?: string;
  userId: string;
  trainingId: string;
  ratingTraining: number;
  message: string;
}
