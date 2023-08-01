import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchCoachTraining, fetchComments, fetchUserOrder } from '../../store/api-actions';
import { Order } from '../../types/order';
import { UserRole } from '../../types/user';
import { AppRoute } from '../../constants';

type Props = {
  order: Order;
  currentUserRole: UserRole;
}

const OrderItem = ({order, currentUserRole}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const routeChange = () =>{
    dispatch(fetchCoachTraining(order.trainingId));
    dispatch(fetchUserOrder(order.trainingId));
    dispatch(fetchComments(order.trainingId));
    const path = `${AppRoute.Training}/${order.trainingId}`;
    navigate(path);
  };

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type="image/webp" srcSet="img/content/thumbnails/training-04.webp, img/content/thumbnails/training-04@2x.webp 2x"/>
            <img src="img/content/thumbnails/training-04.jpg" srcSet="img/content/thumbnails/training-04@2x.jpg 2x" width="330" height="190" alt=""/>
          </picture>
        </div>
        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{order.price}</span><span>₽</span>
        </p>
        <h2 className="thumbnail-training__title">{order.nameTraining}</h2>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{order.trainingType}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{order.caloriesReset}ккал</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span className="thumbnail-training__rate-value">{order.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{order.descriptionTraining}</p>
        </div>
        {currentUserRole === UserRole.User &&
    <div className="thumbnail-training__button-wrapper">
      <button
        className="btn btn--small thumbnail-training__button-catalog"
        type="button"
        onClick={routeChange}
      >Подробнее
      </button>
      <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="/">Отзывы</a>
    </div>}
        {currentUserRole === UserRole.Coach &&
        <button
          className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
          onClick={routeChange}
        >
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#icon-info"></use>
          </svg><span>Подробнее</span>
        </button> }
      </div>
      {currentUserRole === UserRole.Coach &&
    <div className="thumbnail-training__total-info">
      <div className="thumbnail-training__total-info-card">
        <svg width="32" height="32" aria-hidden="true">
          <use xlinkHref="#icon-chart"></use>
        </svg>
        <p className="thumbnail-training__total-info-value">{order.trainingCount}</p>
        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
      </div>
      <div className="thumbnail-training__total-info-card">
        <svg width="31" height="28" aria-hidden="true">
          <use xlinkHref="#icon-wallet"></use>
        </svg>
        <p className="thumbnail-training__total-info-value">{order.totalPrice}<span>₽</span></p>
        <p className="thumbnail-training__total-info-text">Общая сумма</p>
      </div>
    </div>}
    </div>
  );
};

export default OrderItem;
