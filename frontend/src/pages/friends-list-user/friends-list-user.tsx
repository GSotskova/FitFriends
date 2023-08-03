import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { getFriends } from '../../store/friends-data/selectors';
import { AppRoute } from '../../constants';
import FriendItem from '../../components/friend-item/friend-item';
import { UserRole } from '../../types/user';


function FriendsListUserPage(): JSX.Element {
  const friends = useAppSelector(getFriends);

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = AppRoute.AccountUser;
    navigate(path);
  };
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                className="btn-flat friends-list__back"
                type="button"
                onClick={routeChange}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {friends.map((el) =>
                  (
                    <li className="friends-list__item" key={el.id}>
                      <FriendItem user={el} currentUserRole={UserRole.User}/>
                    </li>)
                )}
              </ul>
              <div className="show-more friends-list__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FriendsListUserPage;
