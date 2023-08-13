import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserFullInfo } from '../../store/user-process/selectors';
import { AppRoute } from '../../constants';
import { UserRole } from '../../types/user';
import { getNotifications, getSignNotifyLoadDelete, getErrorDeleteNotify } from '../../store/notify-data/selectors';
import { deleteNotify, fetchNotify } from '../../store/api-actions-request';
import { useEffect, useState } from 'react';


const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserFullInfo);
  const notifications = useAppSelector(getNotifications);
  const isNotifyLoadDelete = useAppSelector(getSignNotifyLoadDelete);
  const hasErrorDeleteNotify = useAppSelector(getErrorDeleteNotify);
  const pathType = userInfo.role === UserRole.Coach ? AppRoute.AccountCoach : AppRoute.AccountUser;
  const pathTypeMain = userInfo.role === UserRole.Coach ? AppRoute.AccountCoach : AppRoute.Main;

  const [countDelete, setCountDelete] = useState(0);
  const handleNotify = (evt: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    setCountDelete(countDelete + 1);
    dispatch(deleteNotify(id));
  };

  useEffect(()=>{
    if (!hasErrorDeleteNotify && !isNotifyLoadDelete) {
      dispatch(fetchNotify());
    }
  }, [countDelete, dispatch, hasErrorDeleteNotify, isNotifyLoadDelete]);


  return (
    <header className="header">
      <div className="container">
        <Link className="header__logo" aria-label="Переход на главную" to={pathTypeMain} data-testid="handleMainClick">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link is-active" to={pathTypeMain} aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={pathType} aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={`${pathType}/friends`} aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <Link to='/' onClick={(evt)=> evt.preventDefault()} className="main-nav__link" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  {notifications.map((el)=>(
                    <li className="main-nav__subitem" key={el.id} >
                      <div className="notification is-active" onClick={(e)=>{handleNotify(e, el.id);}}>
                        <p className="notification__text">{`${el.text} ${el.initiatorName}`}</p>
                        <time className="notification__time" dateTime="2023-12-23 12:35">{
                          new Date(el.dateNotify).toLocaleDateString('ru', {
                            day: '2-digit',
                            year: 'numeric',
                            month: 'long',
                          })
                        }
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label><span className="search__label">Поиск</span>
              <input type="search" name="search"/>
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="/">Бокс</a></li>
              <li className="search__item"><a className="search__link is-active" href="/">Бег</a></li>
              <li className="search__item"><a className="search__link" href="/">Аэробика</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
};
export default Header;
