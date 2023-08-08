import { ChangeEvent, Fragment, useRef, useState } from 'react';
import { deleteCertificate, updateCertificate } from '../../store/api-actions-coach';
import { useAppDispatch } from '../../hooks';
import { FileType } from '../../types/user';

type Props = {
  certificateId?: string;
  certificatePath: string;
}

type FileCertificate = {
  certificatePath: string;
  certificateFile?: File;
}

const CertificateItem = ({certificateId, certificatePath}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isEditForm, setSignEditForm] = useState<boolean>(false);
  const handleEditButtonClick = () => {
    setSignEditForm((prevIsEditForm) => !prevIsEditForm);
  };

  const handleSaveButtonClick = () => {
    setSignEditForm((prevIsEditForm) => !prevIsEditForm);
    if (!fileCertificate.certificateFile) {
      return null;
    }
    const data = {certificateId: certificateId, fileCertificate: fileCertificate.certificateFile} as FileType;
    dispatch(updateCertificate(data));
  };

  const handleDeleteButtonClick = () => {
    if (certificateId) {
      dispatch(deleteCertificate(certificateId));
    }
  };


  const [fileCertificate, setfileCertificate] = useState<FileCertificate>({certificatePath});
  const handlePDFUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setfileCertificate({certificatePath: URL.createObjectURL(evt.target.files[0]), certificateFile: evt.target.files[0]});
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={`certificate-card certificate-card${isEditForm ? '--edit' : ''}`}>
      <div className="certificate-card__image">
        {/*<embed src={`${certificatePath}#toolbar=0`} width="294" height="360" type="application/pdf" />*/}
        <object data={`${fileCertificate.certificatePath}#toolbar=0`}
          type="application/pdf"
          width="294" height="360"
        >не удалось показать документ
        </object>
      </div>
      <div className="certificate-card__buttons">
        {!isEditForm && (
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
            type="button"
            onClick={handleEditButtonClick}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Изменить</span>
          </button>
        )}
        {isEditForm && (
          <Fragment>
            <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
              type="button"
              onClick={handleSaveButtonClick}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Сохранить</span>
            </button>
            <div className="certificate-card__controls">
              <label className="btn-icon certificate-card__control" aria-label="next">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-change"></use>
                </svg>
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
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
                onClick={handleDeleteButtonClick}
              >
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-trash"></use>
                </svg>
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CertificateItem;
