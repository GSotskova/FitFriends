import { Comment } from '../../types/training';

type Props = {
  comment: Comment;
}

const CommentItem = ({comment}: Props): JSX.Element => (
  <div className="review">
    <div className="review__user-info">
      <div className="review__user-photo">
        <picture>
          <img src={comment.avatarPath} width="64" height="64" alt="Изображение пользователя" />
        </picture>
      </div><span className="review__user-name">{comment.userName}</span>
      <div className="review__rating">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg><span>{comment.ratingTraining}</span>
      </div>
    </div>
    <p className="review__comment" data-testid="message">{comment.message}</p>
  </div>
);

export default CommentItem;
