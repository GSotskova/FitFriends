import Carousel from 'react-multi-carousel';
import { Training } from '../../types/training';
import 'react-multi-carousel/lib/styles.css';
import { COUNT_TRAINING_SPECIAL } from '../../constants';
import FakeImg from '../fake-img/fake-img';

type Props = {
  specialTrainings: Training[];
}

const responsiveSpecial = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 1,
  }
};
const SpecialOffers = ({specialTrainings}: Props): JSX.Element => (
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
);

export default SpecialOffers;
