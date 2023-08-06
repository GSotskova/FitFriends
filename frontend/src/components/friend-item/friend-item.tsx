import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { acceptRequest, deleteRequest } from '../../store/api-actions';
import { Friend, StatusRequest, UserRole } from '../../types/user';
import { AppRoute } from '../../constants';

type Props = {
  user: Friend;
  currentUserRole: UserRole;
}

const FriendItem = ({user, currentUserRole}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const isCoach = user.role === UserRole.Coach;
  const handleAcceptQuery = ()=> {
    if (user.requestId) {
      dispatch(acceptRequest(user.requestId));
    }
  };

  const handleRejectQuery = ()=> {
    if (user.requestId) {
      dispatch(deleteRequest(user.requestId));
    }
  };

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = `${AppRoute.Users}/${user.userId}`;
    navigate(path);
  };

  return (
    <div className="thumbnail-friend">
      <div
        className={`thumbnail-friend__info thumbnail-friend__info--theme-${isCoach ? 'dark' : 'light'} `}
        onClick={routeChange}
      >
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <img src={user.avatarPath} width="78" height="78" alt=""/>
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{user.userName}</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">{user.location}</address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {user.trainingType && user.trainingType.map((el)=>
            (
              <li key={el}>
                <div className="hashtag thumbnail-friend__hashtag"><span>#{el}</span></div>
              </li>)
          )}
        </ul>
        {user.isReady &&
        <div className="thumbnail-friend__activity-bar">
          <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
          </div>
        </div>}
      </div>
      {user.requestPersonal &&
        <div className={`thumbnail-friend__request-status thumbnail-friend__request-status--role-${isCoach ? 'user' : 'coach'}`}>
          <p className="thumbnail-friend__request-text">
            Запрос на&nbsp;персональную тренировку {user.requestStatus}
          </p>
          {currentUserRole === UserRole.Coach &&
          <div className="thumbnail-friend__button-wrapper">
            <button
              className="btn btn--medium btn--dark-bg thumbnail-friend__button"
              type="button"
              onClick={handleAcceptQuery}
            >Принять
            </button>
            <button
              className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
              type="button"
              onClick={handleRejectQuery}
            >Отклонить
            </button>
          </div>}
        </div>}
      {user.requestTogether &&
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">
            Запрос на&nbsp;совместную тренировку {user.requestStatus !== StatusRequest.Pending ? user.requestStatus : ''}
          </p>
          {user.requestStatus === StatusRequest.Pending &&
          <div className="thumbnail-friend__button-wrapper">
            <button
              className="btn btn--medium btn--dark-bg thumbnail-friend__button"
              type="button"
              onClick={handleAcceptQuery}
            >Принять
            </button>
            <button
              className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
              type="button"
              onClick={handleRejectQuery}
            >Отклонить
            </button>
          </div>}
        </div>}
    </div>
  );
};

export default FriendItem;
