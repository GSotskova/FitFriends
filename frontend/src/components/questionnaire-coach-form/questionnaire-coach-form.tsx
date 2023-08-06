import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { LEVEL_TRAIN_ARR, LevelTraining, TRAINING_ARR, TrainingType } from '../../types/questionnaire';
import { useAppDispatch } from '../../hooks';
import { registerCoach } from '../../store/api-actions';
import { UserGeneral } from '../../types/user';
import { SuccessCoach } from '../../constants';

enum FormFieldName {
  levelTraining = 'levelTraining',
  trainingType = 'trainingType',
  certificate = 'certificate',
  successCoach = 'successCoach',
  isPersonal = 'isPersonal'
}

type UserData ={
  userData: UserGeneral;
  avatarImg: File | undefined;
}

function QuestionnaireCoachForm({userData, avatarImg}: UserData): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      ...userData,
      levelTraining: currentlevelTraining,
      trainingType: currentTrainingType,
      certificate: String(fileCertificate),
      successCoach: String(formData.get(FormFieldName.successCoach)),
      isPersonal: !!formData.get(FormFieldName.isPersonal),
      avatarImg: avatarImg,
      fileCertificate: fileCertificate,
    };

    if (!isNotTrainingType) {
      dispatch(registerCoach(data));
    }
  };

  const [currentTrainingType, setCurrentTrainingType] = useState<TrainingType[]>([]);
  const [isNotTrainingType, setIsNotTrainingType] = useState(false);
  const handleTrTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    const isChecked = currentTrainingType.find((el) => el === value);
    if (isChecked) {
      const currentArr = currentTrainingType.filter((el) => el !== value);
      setCurrentTrainingType(currentArr);
      evt.target.removeAttribute('checked');
      currentArr.length === 0 ? setIsNotTrainingType(true) : setIsNotTrainingType(false);
    }
    else {
      (currentTrainingType.length > 2 ) ? setIsNotTrainingType(true) : setIsNotTrainingType(false);
      setCurrentTrainingType([...currentTrainingType, value as TrainingType]);
      evt.target.setAttribute('checked', 'true');
    }
  };

  const [currentlevelTraining, setCurrentlevelTraining] = useState<LevelTraining>(LevelTraining.Beginner);
  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCurrentlevelTraining(value as LevelTraining);
    evt.target.setAttribute('checked', 'true');
  };

  const [successCoach, setSuccessCoach] = useState<string>('');
  const handleSuccessChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setSuccessCoach(value);
  };
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      successCoach && (successCoach.length < SuccessCoach.MinLength
      || successCoach.length > SuccessCoach.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [successCoach]);

  const [fileCertificate, setfileCertificate] = useState<File | undefined>();
  const handlePDFUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setfileCertificate(evt.target.files[0]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={handleFormSubmit}
            >
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <div className="questionnaire-coach__block custom-input--error"><span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-coach__specializations">
                      {TRAINING_ARR.map((el) => (
                        <div className="btn-checkbox" key={el}>
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              name="specialisation"
                              value={el}
                              id={el}
                              onChange={handleTrTypeChange}
                            />
                            <span className="btn-checkbox__btn">{el}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {isNotTrainingType &&
                          <span className="custom-input__error">Необходимо выбрать 1-3 значений</span>}
                  </div>
                  <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                      {LEVEL_TRAIN_ARR.map((el)=>
                        (
                          <div className="custom-toggle-radio__block" key={el}>
                            <label>
                              {el === LevelTraining.Beginner ?
                                (
                                  <input
                                    type="radio"
                                    name="level"
                                    id={el}
                                    value={el}
                                    required
                                    onChange={handleLevelChange}
                                  />
                                )
                                :
                                (
                                  <input
                                    type="radio"
                                    name="level"
                                    id={el}
                                    value={el}
                                    onChange={handleLevelChange}
                                  />
                                )}
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{el}</span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span
                          className="drag-and-drop__label"
                          tabIndex={0}
                        >
                          {fileCertificate ? fileCertificate.name : 'Загрузите сюда файлы формата PDF'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          accept=".pdf"
                          ref={inputRef}
                          required
                          onChange={handlePDFUpload}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <span className="custom-input--error">
                          <textarea
                            id={FormFieldName.successCoach}
                            name={FormFieldName.successCoach}
                            placeholder=" "
                            onChange={handleSuccessChange}
                          >
                          </textarea>
                          {isNotCorrectLength &&
                          <span className="custom-textarea__error">Минимальная длина 10 символ. Максимальная длина 140 символов</span>}
                        </span>
                      </label>
                    </div>
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input type="checkbox" value="individual-training" name={FormFieldName.isPersonal}/>
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireCoachForm;
