import CertificateSlider from '../certificates-slider/certificates-slider';
import { UserFullInfo } from '../../types/user';


type Prop ={
  handleClose?: () => void;
  coachInfo: UserFullInfo;
}


const PopupCertificates = ({coachInfo, handleClose}: Prop): JSX.Element => (
  <section className="popup">
    <div className="popup__wrapper">
      <div className="popup-head">
        <h2 className="popup-head__header">Сертификаты тренера</h2>
        <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={handleClose}>
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-cross"></use>
          </svg>
        </button>
      </div>
      {coachInfo.certificate &&
        <CertificateSlider coachInfo={coachInfo} isPopup/> }
      {!coachInfo.certificate &&
        <div>Нет загруженных сертификатов</div>}
    </div>
  </section>
);
export default PopupCertificates;
