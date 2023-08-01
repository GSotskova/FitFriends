import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import OrderItem from '../../components/order-item/order-item';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOrders } from '../../store/orders-data/selectors';
import { AppRoute } from '../../constants';
import { useState } from 'react';
import { fetchUserOrders } from '../../store/api-actions';
import { UserRole } from '../../types/user';

function UserBuyPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = AppRoute.AccountUser;
    navigate(path);
  };

  const [filterIsDone, setFilter] = useState<boolean | null >(null);
  const handleSetFilter = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (filterIsDone === false) {
      evt.target.removeAttribute('checked');
      setFilter(null);
      dispatch(fetchUserOrders());
    } else {
      evt.target.setAttribute('checked', 'true');
      setFilter(false);
      dispatch(fetchUserOrders({isDone: 'false'}));
    }
  };


  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-orders__back"
                type="button"
                onClick={routeChange}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                        onChange={handleSetFilter}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {orders.map((el) =>
                  (
                    <li className="my-purchases__item" key={el.id}>
                      <OrderItem order={el} currentUserRole={UserRole.User}/>
                    </li>)
                )}
              </ul>
              <div className="show-more my-purchases__show-more">
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

export default UserBuyPage;
