import Carousel from 'react-multi-carousel';
import { Training } from '../../types/training';
import 'react-multi-carousel/lib/styles.css';
import './popular-trainings.css';
import { AppRoute } from '../../constants';
import FakeImg from '../fake-img/fake-img';
import { useNavigate } from 'react-router-dom';
import { fetchCatalogTrainings, fetchCountTrainings } from '../../store/api-actions-trainings';
import { useAppDispatch } from '../../hooks';
import { UserRole } from '../../types/user';
import TrainingItem from '../training-item/training-item';

type Props = {
  trainings: Training[];
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

const ButtonGroupPopular = ({next, previous}: Prop ) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeChangeTraining = () =>{
    dispatch(fetchCountTrainings(UserRole.User));
    dispatch(fetchCatalogTrainings());
    const path = `${AppRoute.Training}/catalog`;
    navigate(path);
  };
  return (
    <div className="popular-trainings__title-wrapper">
      <h2 className="popular-trainings__title">Популярные тренировки</h2>
      <button
        className="btn-flat popular-trainings__button"
        type="button"
        onClick={routeChangeTraining}
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
};


const PopularTrainings = ({trainings}: Props): JSX.Element => (
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
          <ButtonGroupPopular/>
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
);

export default PopularTrainings;
