import Carousel from 'react-multi-carousel';
import { Training } from '../../types/training';
import 'react-multi-carousel/lib/styles.css';
import './training-for-user.css';
import { AppRoute, COUNT_TRAINING_FOR_YOU } from '../../constants';
import FakeImg from '../fake-img/fake-img';
import { useNavigate } from 'react-router-dom';
import { fetchCoachTraining, fetchComments } from '../../store/api-actions-trainings';
import { fetchUserOrder } from '../../store/api-actions-order';
import { useAppDispatch } from '../../hooks';

type Props = {
  userTrainings: Training[];
}
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
  }
};
type Prop ={
  next?: () => void;
  previous?: () => void;
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
const TrainingForUser = ({userTrainings}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeChangeCard = (id: string) =>{
    dispatch(fetchCoachTraining(id));
    dispatch(fetchUserOrder(id));
    dispatch(fetchComments(id));
    const path = `${AppRoute.Training}/${id}`;
    navigate(path);
  };
  return (
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
  );
};

export default TrainingForUser;
