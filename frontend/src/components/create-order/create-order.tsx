import { useState } from 'react';
import { Training } from '../../types/training';
import { PAY_OPTION, PaymentOption } from '../../types/order';
import { postOrder } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getErrorPost } from '../../store/orders-data/selectors';
import { getLoadingPost } from '../../store/orders-data/selectors';
import { COUNT_ORDER_DEFAULT } from '../../constants';

type Prop ={
  handleClose?: () => void;
  training: Training;
}


const CreateOrder = ({training, handleClose}: Prop): JSX.Element => {
  const dispatch = useAppDispatch();
  const [countTraining, setCountTraining] = useState(COUNT_ORDER_DEFAULT);
  const isErrorPost = useAppSelector(getErrorPost);
  const isLoadingPost = useAppSelector(getLoadingPost);

  const handleCount = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (evt.currentTarget.name === 'minus') {
      setCountTraining(countTraining === 1 ? countTraining : countTraining - 1);
    } else {
      setCountTraining(countTraining + 1);
    }
  };

  const [paymentType, setPaymentType] = useState<PaymentOption>();
  const [isNotPaymentType, setSignNotPaymentType] = useState(false);
  const handlePayChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setPaymentType(value as PaymentOption);
    evt.target.setAttribute('checked', 'true');
    setSignNotPaymentType(false);
  };


  const [isDone, setSignDone] = useState(false);
  const handleCreateOrder = () => {
    if (paymentType) {
      const data = {
        trainingId: training.id,
        trainingCount: countTraining,
        paymentOption: paymentType
      };
      dispatch(postOrder(data));
      setSignDone(true);
    }
    if(!paymentType) {
      setSignNotPaymentType(true);
    }
  };


  return (
    <div className="popup__wrapper">
      <div className="popup-head">
        <h2 className="popup-head__header">{isDone && !isErrorPost ? 'Заказ создан' : 'Купить тренировку'}</h2>
        <button
          className="btn-icon btn-icon--outlined btn-icon--big"
          type="button"
          aria-label="close"
          onClick={handleClose}
        >
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-cross"></use>
          </svg>
        </button>
      </div>
      <div className="popup__content popup__content--purchases">
        <div className="popup__product">
          <div className="popup__product-image">
            <picture>
              <img src={training.photoTraningPath} width="98" height="80" alt=""/>
            </picture>
          </div>
          <div className="popup__product-info">
            <h3 className="popup__product-title">{training.nameTraining}</h3>
            <p className="popup__product-price">{training.price} ₽</p>
          </div>
          <div className="popup__product-quantity">
            <p className="popup__quantity">Количество</p>
            <div className="input-quantity">
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="minus"
                name="minus"
                onClick={handleCount}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <div className="input-quantity__input">
                <label>
                  <input type="text" value={countTraining} size={2} readOnly />
                </label>
              </div>
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="plus"
                name="plus"
                onClick={handleCount}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <section className="payment-method">
          {!isNotPaymentType && <h4 className="payment-method__title">Выберите способ оплаты</h4>}
          {isNotPaymentType && <h4 className="payment-method__title" style={{color: 'red'}}>Выберите способ оплаты</h4>}
          <ul className="payment-method__list">

            {PAY_OPTION.map((el)=>
              (
                <li className="payment-method__item" key={el}>
                  <div className="btn-radio-image">
                    <label>
                      {el === PaymentOption.Visa ?
                        (
                          <input
                            type="radio"
                            name="payment"
                            id={el}
                            value={el}
                            required
                            onChange={handlePayChange}
                          />
                        )
                        :
                        (
                          <input
                            type="radio"
                            name="payment"
                            id={el}
                            value={el}
                            onChange={handlePayChange}
                          />
                        )}
                      <span className="btn-radio-image__image">
                        <svg width="58" height="20" aria-hidden="true">
                          <use xlinkHref={`#${el}-logo`}></use>
                        </svg>
                      </span>
                    </label>
                  </div>
                </li>
              )
            )}
          </ul>
        </section>
        <div className="popup__total">
          <p className="popup__total-text">Итого</p>
          <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
            <use xlinkHref="#dash-line"></use>
          </svg>
          <p className="popup__total-price">{Number(training.price) * countTraining} ₽</p>
        </div>
        <div className="popup__button">
          <button
            className="btn"
            type="button"
            onClick={handleCreateOrder}
            disabled={isLoadingPost || isErrorPost || isDone}
          >Купить
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateOrder;
