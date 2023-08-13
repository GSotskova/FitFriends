import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './look-for-company.css';
import { AppRoute, COUNT_USERS_READY } from '../../constants';
import FakeImg from '../fake-img/fake-img';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { UserFullInfo } from '../../types/user';
import UserItem from '../user-item/user-item';
import { fetchCountUsers, fetchUserCatalog } from '../../store/api-actions-user';

type Props = {
  users: UserFullInfo[];
}


const responsiveFour = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 4,
  }
};

type Prop ={
  next?: () => void;
  previous?: () => void;
}

const ButtonGroupDark = ({next, previous}: Prop ) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeChangeUsers = () =>{
    dispatch(fetchCountUsers());
    dispatch(fetchUserCatalog());
    const path = AppRoute.Users;
    navigate(path);
  };

  return (
    <div className="look-for-company__title-wrapper">
      <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
      <button
        className="btn-flat btn-flat--light look-for-company__button"
        type="button"
        onClick={routeChangeUsers}
      >
        <span>Смотреть все</span>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
      <div className="look-for-company__controls">
        <button
          className="btn-icon btn-icon--outlined look-for-company__control"
          type="button" aria-label="previous"
          onClick={() => previous?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </button>
        <button
          className="btn-icon btn-icon--outlined look-for-company__control"
          type="button" aria-label="next"
          onClick={() => next?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};


const LookForCompany = ({users}: Props): JSX.Element => (
  <section className="look-for-company">
    <div className="container">
      <div className="look-for-company__wrapper conteiner-main-revers" data-testid="look">
        {users.length !== 0 &&
                <Carousel
                  responsive={responsiveFour}
                  arrows={false}
                  containerClass="container conteiner_order"
                  focusOnSelect
                  pauseOnHover
                  slidesToSlide={1}
                  renderButtonGroupOutside
                  customButtonGroup={<ButtonGroupDark/>}
                >
                  {users.slice(0, COUNT_USERS_READY).map((el)=>
                    (
                      <div className="look-for-company__item" key={el.id}>
                        <UserItem user={el} isMainPage/>
                      </div>)
                  )}
                </Carousel>}
        {users.length === 0 && ( <FakeImg />)}
      </div>
    </div>
  </section>
);

export default LookForCompany;
