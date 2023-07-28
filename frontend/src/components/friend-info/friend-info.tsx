import { useAppDispatch } from '../../hooks';
import { acceptRequest, deleteRequest } from '../../store/api-actions';
import { Friend } from '../../types/user';

type Props = {
  user: Friend;
}

const FriendInfo = ({user}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="thumbnail-friend">
      <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
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
          <li>
            <div className="hashtag thumbnail-friend__hashtag"><span>#аэробика</span></div>
          </li>
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
          </div>
        </div>
      </div>
      {user.requestPersonal &&
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
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
          </div>
        </div>}
    </div>
  );
};

export default FriendInfo;
