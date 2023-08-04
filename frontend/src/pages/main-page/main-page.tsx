import _ from 'lodash';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './main-page.css';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTrainings, getTrainingsDataLoadingStatus, getUserTrainings } from '../../store/trainings-data/selectors';
import FakeImg from '../../components/fake-img/fake-img';
import { AppRoute, COUNT_TRAINING_FOR_YOU, COUNT_TRAINING_SPECIAL, COUNT_USERS_READY } from '../../constants';
import TrainingItem from '../../components/training-item/training-item';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../store/user-process/selectors';
import UserItem from '../../components/user-item/user-item';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchCatalogTrainings, fetchCoachTraining, fetchComments, fetchCountTrainings, fetchCountUsers, fetchUserCatalog, fetchUserOrder } from '../../store/api-actions';
import { UserRole } from '../../types/user';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
  }
};

const responsiveSpecial = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 1,
  }
};

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
  routeChangeTraining?: () => void;
  routeChangeUsers?: () => void;
}

const ButtonGroup = ({next, previous}: Prop ) => (
  <div className="special-for-you__title-wrapper">
    <h2 className="special-for-you__title">Специально подобрано для вас</h2>
    <div className="special-for-you__controls">
      <button
        className="btn-icon personal-account-coach__control"
        type="button"
        aria-label="previous"
        onClick={() => previous?.()}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button
        className="btn-icon personal-account-coach__control"
        type="button"
        aria-label="next"
        onClick={() => next?.()}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
  </div>
);

const ButtonGroupPopular = ({next, previous, routeChangeTraining}: Prop ) => (
  <div className="popular-trainings__title-wrapper">
    <h2 className="popular-trainings__title">Популярные тренировки</h2>
    <button
      className="btn-flat popular-trainings__button"
      type="button"
      onClick={()=>routeChangeTraining?.()}
    ><span>Смотреть все</span>
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-right"></use>
      </svg>
    </button>
    <div className="popular-trainings__controls">
      <button
        className="btn-icon popular-trainings__control"
        type="button"
        aria-label="previous"
        onClick={() => previous?.()}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button
        className="btn-icon popular-trainings__control"
        type="button"
        aria-label="next"
        onClick={() => next?.()}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
  </div>
);

const ButtonGroupDark = ({next, previous, routeChangeUsers}: Prop ) => (
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


function MainPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const userTrainings = useAppSelector(getUserTrainings);
  const isTrainingsDataLoading = useAppSelector(getTrainingsDataLoadingStatus);
  const trainingsNotSort = useAppSelector(getTrainings);
  const trainings = _.sortBy(trainingsNotSort, 'rating').reverse();
  const specialTrainings = trainings.filter((el)=>el.isSpecialOffer === true);

  const navigate = useNavigate();
  const routeChangeUsers = () =>{
    dispatch(fetchCountUsers());
    dispatch(fetchUserCatalog());
    const path = AppRoute.Users;
    navigate(path);
  };


  const routeChangeTraining = () =>{
    dispatch(fetchCountTrainings(UserRole.User));
    dispatch(fetchCatalogTrainings());
    const path = `${AppRoute.Training}/catalog`;
    navigate(path);
  };

  const routeChangeCard = (id: string) =>{
    dispatch(fetchCoachTraining(id));
    dispatch(fetchUserOrder(id));
    dispatch(fetchComments(id));
    const path = `${AppRoute.Training}/${id}`;
    navigate(path);
  };

  if (isTrainingsDataLoading) {
    return (<LoadingScreen />);
  }

  if(!users) {
    return null;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section className="special-for-you">
          {userTrainings.length !== 0 &&
      (
        <div className="container">
          <div className="special-for-you__wrapper conteiner-main-revers">
            <Carousel
              responsive={responsive}
              arrows={false}
              containerClass="container conteiner_order"
              focusOnSelect
              pauseOnHover
              slidesToSlide={1}
              renderButtonGroupOutside
              customButtonGroup={
                <ButtonGroup />
              }
            >
              {
                userTrainings.slice(0, COUNT_TRAINING_FOR_YOU).map((el)=>
                  (
                    <div className="thumbnail-preview" key={el.id}>
                      <div className="thumbnail-preview__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"/>
                          <img src="img/content/thumbnails/preview-03.jpg" srcSet="img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-preview__inner">
                        <h3 className="thumbnail-preview__title">{el.nameTraining}</h3>
                        <div className="thumbnail-preview__button-wrapper">
                          <button
                            className="btn btn--small thumbnail-training__button-catalog"
                            type="button"
                            onClick={()=>routeChangeCard(el.id)}
                          >Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              }
            </Carousel>
          </div>
        </div>)}
          {userTrainings.length === 0 && (
            <FakeImg />
          )}
        </section>
        <section className="special-offers">
          <div className="container">
            <div className="special-offers__wrapper">
              <h2 className="visually-hidden">Специальные предложения</h2>
              {specialTrainings.length !== 0 &&
              (
                <Carousel
                  responsive={responsiveSpecial}
                  arrows={false}
                  containerClass="container special-offers__list"
                  focusOnSelect
                  pauseOnHover
                  showDots
                  slidesToSlide={1}
                >
                  {
                    specialTrainings.slice(0, COUNT_TRAINING_SPECIAL).map((el)=>
                      (
                        <aside className="promo-slider" key={el.id}>
                          <div className="promo-slider__overlay"></div>
                          <div className="promo-slider__image">
                            <img src="img/content/promo-1.png" width="1040" height="469" alt="promo"/>
                          </div>
                          <div className="promo-slider__header">
                            <h3 className="promo-slider__title">{el.nameTraining}</h3>
                            <div className="promo-slider__logo">
                              <svg width="74" height="74" aria-hidden="true">
                                <use xlinkHref="#logotype"></use>
                              </svg>
                            </div>
                          </div>
                          <span className="promo-slider__text">{el.descriptionTraining}</span>
                          <div className="promo-slider__bottom-container">
                            <div className="promo-slider__slider-dots">
                            </div>
                            <div className="promo-slider__price-container">
                              <p className="promo-slider__price">{el.price} ₽</p>
                              <p className="promo-slider__sup">за занятие</p>
                              <p className="promo-slider__old-price">{Number(el.price) + Number(el.price) * 0.1} ₽</p>*
                            </div>
                          </div>
                        </aside>
                      )
                    )
                  }
                </Carousel>
              )}
              {specialTrainings.length === 0 && (
                <FakeImg />
              )}
              <FakeImg />
            </div>
          </div>
        </section>
        <section className="popular-trainings">
          <div className="container">
            <div className="popular-trainings__wrapper conteiner-main-revers">
              {trainings.length !== 0 &&
        (
          <Carousel
            responsive={responsiveFour}
            arrows={false}
            containerClass="container conteiner_order popular-trainings__list"
            itemClass="popular-trainings__item"
            focusOnSelect
            pauseOnHover
            slidesToSlide={1}
            renderButtonGroupOutside
            customButtonGroup={
              <ButtonGroupPopular routeChangeTraining={routeChangeTraining}/>
            }
          >
            {
              trainings.map((el)=>
                (
                  <div className="thumbnail-training" key={el.id}>
                    <TrainingItem training={el}/>
                  </div>
                )
              )
            }
          </Carousel>
        )}
              {trainings.length === 0 && (
                <FakeImg />
              )}
            </div>
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
            <div className="look-for-company__wrapper conteiner-main-revers">
              {users.length !== 0 &&
                <Carousel
                  responsive={responsiveFour}
                  arrows={false}
                  containerClass="container conteiner_order"
                  focusOnSelect
                  pauseOnHover
                  slidesToSlide={1}
                  renderButtonGroupOutside
                  customButtonGroup={<ButtonGroupDark routeChangeUsers={routeChangeUsers}/>}
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
      </main>
    </div>

  );
}

export default MainPage;
