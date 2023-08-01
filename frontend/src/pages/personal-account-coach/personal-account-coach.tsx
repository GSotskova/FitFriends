import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UserInfo from '../../components/user-info/user-info';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserFullInfo } from '../../store/user-process/selectors';
import { AppRoute } from '../../constants';
import './personal-account-coach.css';
import CertificateItem from '../../components/certificate-item/certificate-item';
import { ChangeEvent, useRef } from 'react';
import { postCertificate } from '../../store/api-actions';
import { FileType } from '../../types/user';


const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
};

type Prop ={
  next?: () => void;
  previous?: () => void;
}
const ButtonGroup = ({next, previous}: Prop ) => (

  <div className="personal-account-coach__controls">
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


);
function AccountCoachPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const coachInfo = useAppSelector(getUserFullInfo);

  const handlePDFUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    dispatch(postCertificate({fileCertificate: evt.target.files[0]} as FileType));
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo user={coachInfo}/>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.AccountCoach}/trainings`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.AccountCoach}/trainings/create`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.AccountCoach}/friends`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={`${AppRoute.AccountCoach}/orders`}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                        <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                            <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <div className="thumbnail-spec-gym__header" style={{ display: 'flex', justifyContent: 'center' }}>
                          <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="personal-account-coach__additional-info conteiner-revers">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                      <label className="btn-flat btn-flat--underlined personal-account-coach__button">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg><span>Загрузить</span>
                        <input
                          className="visually-hidden"
                          type="file"
                          name="import"
                          accept=".pdf"
                          ref={inputRef}
                          required
                          onChange={handlePDFUpload}
                        />
                      </label>
                    </div>
                    <Carousel
                      responsive={responsive}
                      arrows={false}
                      containerClass="container conteiner_order"
                      focusOnSelect
                      pauseOnHover
                      showDots
                      slidesToSlide={1}
                      renderButtonGroupOutside
                      customButtonGroup={
                        <ButtonGroup />
                      }
                    >
                      {
                        coachInfo.certificatesPath.map((el)=>
                          <CertificateItem certificatePath={el.certificatePath} certificateId={el.certificateId} key={el.certificateId}/>
                        )
                      }
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AccountCoachPage;
