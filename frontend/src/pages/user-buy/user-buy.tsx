import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import OrderItem from '../../components/order-item/order-item';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCountOrders, getOrders, getOrdersUserLoadingStatus } from '../../store/orders-data/selectors';
import { AppRoute, ORDERS_LIMIT } from '../../constants';
import { useEffect, useState } from 'react';
import { fetchUserOrders } from '../../store/api-actions-order';
import { UserRole } from '../../types/user';
import { Query } from '../../types/training';
import LoadingScreen from '../loading-screen/loading-screen';

function UserBuyPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const isOrdersUserDataLoading = useAppSelector(getOrdersUserLoadingStatus);
  const totalOrders = useAppSelector(getCountOrders);
  const totalPage = Math.ceil(totalOrders / ORDERS_LIMIT);

  const [query, setQuery] = useState<Query>({limit: ORDERS_LIMIT, page: 1});
  const navigate = useNavigate();
  const routeChange = () =>{
    const path = AppRoute.AccountUser;
    navigate(path);
  };

  const handleSetFilter = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (query?.isDone === 'false') {
      evt.target.removeAttribute('checked');
      setQuery({limit: query.limit, page: query.page});
    } else {
      evt.target.setAttribute('checked', 'true');
      setQuery({...query, isDone: 'false'});
    }
  };
  useEffect(()=>{
    dispatch(fetchUserOrders(query));
  }, [dispatch, query]);

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  if (isOrdersUserDataLoading) {
    <LoadingScreen/>;
  }
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
                {totalPage !== query.page &&
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={() => setQuery({...query, page: query.page ? query.page + 1 : 1})}
                  >Показать еще
                  </button> }
                {totalPage === query.page && totalPage !== 1 &&
                  <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserBuyPage;
