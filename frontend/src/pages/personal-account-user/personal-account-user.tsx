import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import UserInfo from '../../components/user-info/user-info';
import { useAppSelector } from '../../hooks';
import { getUserFullInfo } from '../../store/user-process/selectors';
import { AppRoute } from '../../constants';


function AccountUserPage(): JSX.Element {
  const userInfo = useAppSelector(getUserFullInfo);


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo user={userInfo}/>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на день, ккал</span>
                            <input type="text" name="schedule-for-the-day" value={userInfo.caloriesSpend}/>
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на неделю, ккал</span>
                            <input type="text" name="schedule-for-the-week" value={userInfo.caloriesSpend * 7}/>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__additional-info">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.AccountUser}/friends`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.AccountUser}/orders`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои покупки</span>
                    </Link>
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <img src="img/content/thumbnails/nearest-gym-01.jpg" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-spec-gym__header" style={{alignItems: 'center'}}>
                        <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AccountUserPage;
