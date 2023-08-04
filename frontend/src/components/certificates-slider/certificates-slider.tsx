import { useAppDispatch } from '../../hooks';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CertificateItem from '../../components/certificate-item/certificate-item';
import { ChangeEvent, useRef } from 'react';
import { postCertificate } from '../../store/api-actions';
import { FileType, UserFullInfo } from '../../types/user';
import './certificates-slider.css';

type Prop ={
  coachInfo: UserFullInfo;
  isPopup?: boolean;
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

const responsivePopup = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 1,
  }
};

type PropBtn ={
  next?: () => void;
  previous?: () => void;
  isPopup?: boolean;
}


const ButtonGroup = ({next, previous, isPopup}: PropBtn ) => {
  const dispatch = useAppDispatch();
  const handlePDFUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    dispatch(postCertificate({fileCertificate: evt.target.files[0]} as FileType));
  };
  const inputRef = useRef<HTMLInputElement | null>(null);


  return (
    <div className="personal-account-coach__label-wrapper">
      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
      {!isPopup &&
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
      </label>}
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
    </div>
  );
};

const CertificateSlider = ({coachInfo, isPopup}: Prop): JSX.Element => {
  const resp = isPopup ? responsivePopup : responsive;

  return (
    <div className="personal-account-coach__additional-info conteiner-revers">
      <Carousel
        responsive={resp}
        arrows={false}
        containerClass="container conteiner_order"
        focusOnSelect
        pauseOnHover
        slidesToSlide={1}
        renderButtonGroupOutside
        customButtonGroup={
          <ButtonGroup isPopup={isPopup}/>
        }
      >
        {
          coachInfo.certificatesPath.map((el)=>
            <CertificateItem certificatePath={el.certificatePath} certificateId={el.certificateId} key={el.certificateId}/>
          )
        }
      </Carousel>
    </div>
  );
};
export default CertificateSlider;
