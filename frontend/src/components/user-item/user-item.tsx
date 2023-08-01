import { UserFullInfo, UserRole } from '../../types/user';

type Props = {
  user: UserFullInfo;
  isMainPage?: boolean;
}

const UserItem = ({user, isMainPage}: Props): JSX.Element => {
  const isCoach = user.role === UserRole.Coach && !isMainPage;

  return (
    <div className={`thumbnail-user thumbnail-user--role-${isCoach ? 'coach' : 'user'} ${isMainPage ? 'thumbnail-user--dark' : ' '}`}>
      <div className="thumbnail-user__image">
        <picture>
          <img src={user.avatarPath} width="82" height="82" alt=""/>
        </picture>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.userName}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{user.location}</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {user.trainingType.map((el)=>
          (
            <li className="thumbnail-user__hashtags-item" key={el}>
              <div className="hashtag thumbnail-user__hashtag"><span>#{el}</span></div>
            </li>)
        )}

      </ul>
      <a
        className={`btn ${isMainPage ? 'btn--outlined' : ''} ${isCoach ? 'btn--dark-bg' : ''} btn--dark-bg btn--medium thumbnail-user__button`}
        href="/"
      >Подробнее
      </a>
    </div>
  );
};

export default UserItem;
