import { useEffect, useState } from 'react';
import { postComment } from '../../store/api-actions-trainings';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getErrorPost } from '../../store/comment-data/selectors';
import { CommentLn, DEFAULT_RATING, RATING_TRAINING_ARR } from '../../constants';
import { toast } from 'react-toastify';


type Prop ={
  handleClose?: () => void;
  trainingId: string;
  userId: string;
}


const CreateComment = ({trainingId, userId, handleClose}: Prop): JSX.Element => {
  const dispatch = useAppDispatch();
  const isErrorPost = useAppSelector(getErrorPost);

  const [currentRating, setRating] = useState(DEFAULT_RATING);
  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setRating(Number(value));
    evt.target.setAttribute('checked', 'true');
  };


  const [messageText, setMessageText] = useState<string>('');
  const handleMessageChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setMessageText(value);
  };
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      messageText && (messageText.length < CommentLn.MinLength
      || messageText.length > CommentLn.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [messageText]);

  const [isDone, setSignDone] = useState(false);
  const handleCreateComment = () => {
    if (!isNotCorrectLength) {
      const data = {
        userId: userId,
        trainingId: trainingId,
        ratingTraining: currentRating,
        message: messageText
      };
      dispatch(postComment(data));
      setSignDone(true);
    }
  };

  useEffect (() => {
    if(!isErrorPost && isDone && handleClose) {
      handleClose();
    }
  },[dispatch, handleClose, isDone, isErrorPost, trainingId]
  );
  if (isErrorPost) {
    toast.warn('Сервер не доступен. Попробуйте зайти позднее');
  }
  return (
    <section className="popup">
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={handleClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            {RATING_TRAINING_ARR.map((el) => (
              <li className="popup__rate-item" key={el}>
                <div className="popup__rate-item-wrap">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      aria-label={`оценка ${el}.`}
                      id={el.toString()}
                      value={el}
                      checked={el === currentRating}
                      required
                      onChange={handleRatingChange}
                    />
                    <span className="popup__rate-number">{el}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <span className="custom-input--error">
                    <textarea name="description" placeholder=" " onChange={handleMessageChange}></textarea>
                    {isNotCorrectLength &&
                          <span className="custom-textarea__error">Минимальная длина 100 символ. Максимальная длина 1024 символов</span>}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button
              className="btn"
              type="button"
              disabled={isErrorPost || isDone}
              onClick={handleCreateComment}
            >Продолжить
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CreateComment;
