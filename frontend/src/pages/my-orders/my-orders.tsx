import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import OrderItem from '../../components/order-item/order-item';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOrders } from '../../store/orders-data/selectors';
import { AppRoute } from '../../constants';
import { useState } from 'react';
import { fetchCoachOrders } from '../../store/api-actions';
import { UserRole } from '../../types/user';

function MyOrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const navigate = useNavigate();
  const routeChange = () =>{
    const path = AppRoute.AccountCoach;
    navigate(path);
  };

  const [sortData, setSort] = useState({
    nextSortPrice:'desc',
    nextSortCount:'desc',
    currentSortPrice:'',
    currentSortCount:'',
    iconPrice:'up',
    iconCount:'up',
    sortStr:' '
  });
  const handleSortPrice = () => {
    const sortCount = sortData.currentSortCount ? `&sortCount=${sortData.currentSortCount}` : '';
    setSort({
      ...sortData,
      nextSortPrice: sortData.nextSortPrice === 'desc' ? 'asc' : 'desc',
      currentSortPrice: sortData.nextSortPrice,
      sortStr: `sortPrice=${sortData.nextSortPrice}${sortCount}`,
      iconPrice: sortData.nextSortPrice === 'desc' ? 'down' : 'up'
    });
    dispatch(fetchCoachOrders(sortData.sortStr));
  };
  const handleSortCount = () => {
    const sortPrice = sortData.currentSortPrice ? `&sortPrice=${sortData.currentSortPrice}` : '';
    setSort({
      ...sortData,
      nextSortCount: sortData.nextSortCount === 'desc' ? 'asc' : 'desc',
      currentSortCount: sortData.nextSortCount,
      sortStr: `sortCount=${sortData.nextSortCount}${sortPrice}`,
      iconCount: sortData.nextSortCount === 'desc' ? 'down' : 'up'
    });
    dispatch(fetchCoachOrders(sortData.sortStr));
  };

  return (

    <div className="wrapper">
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-orders__back"
                type="button"
                onClick={routeChange}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={handleSortPrice}
                    ><span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref={`#icon-sort-${sortData.iconPrice}`}></use>
                      </svg>
                    </button>
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={handleSortCount}
                    ><span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref={`#icon-sort-${sortData.iconCount}`}></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {orders.map((el) =>
                  (
                    <li className="my-orders__item" key={el.id}>
                      <OrderItem order={el} currentUserRole={UserRole.Coach}/>
                    </li>)
                )}
              </ul>
              <div className="show-more my-orders__show-more">
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

export default MyOrdersPage;
