import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { UserRole } from '../../types/user';
import { AppRoute } from '../../constants';
import CommentItem from '../../components/comment-item/comment-item';
import { getSignUserLoading, getUserFullInfo } from '../../store/user-process/selectors';
import { useNavigate } from 'react-router-dom';
import { getComments, getSignCommentsLoading } from '../../store/comment-data/selectors';
import { getTraining, getIsTrainingLoading } from '../../store/trainings-data/selectors';
import TrainingForm from '../../components/training-form/training-form';
import LoadingScreen from '../loading-screen/loading-screen';

function TrainingCardPage() {
  const user = useAppSelector(getUserFullInfo);
  const isUserLoading = useAppSelector(getSignUserLoading);
  const comments = useAppSelector(getComments);
  const isCommentsLoading = useAppSelector(getSignCommentsLoading);
  const isCoach = user.role === UserRole.Coach;


  const training = useAppSelector(getTraining);
  const isTrainLoading = useAppSelector(getIsTrainingLoading);

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = `${AppRoute.AccountCoach}/trainings`;
    navigate(path);
  };

  if (!training) {
    return null;
  }

  if (isTrainLoading || isUserLoading || isCommentsLoading) {
    return (<LoadingScreen />);
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button
                  className="btn-flat btn-flat--underlined reviews-side-bar__back"
                  type="button"
                  onClick={routeChange}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {comments.map((el)=>
                    (
                      <li className="reviews-side-bar__item" key={el.id}>
                        <CommentItem comment={el} />
                      </li>)
                  )}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  disabled={isCoach}
                >
                    Оставить отзыв
                </button>
              </aside>
              <TrainingForm training={training} role={user.role} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrainingCardPage;
