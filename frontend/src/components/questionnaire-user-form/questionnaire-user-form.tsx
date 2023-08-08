import { FormEvent, useState } from 'react';
import { LEVEL_TRAIN_ARR, LevelTraining, TRAINING_ARR, TrainingTime, TrainingType, TRAINING_TIME } from '../../types/questionnaire';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/api-actions-user';
import { UserGeneral } from '../../types/user';

enum FormFieldName {
  levelTraining = 'levelTraining',
  trainingType = 'trainingType',
  trainingTime = 'trainingTime',
  caloriesReset = 'caloriesReset',
  caloriesSpend = 'caloriesSpend'
}

type UserData ={
  userData: UserGeneral;
  avatarImg: File | undefined;
}

function QuestionnaireUserForm({userData, avatarImg}: UserData): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      ...userData,
      levelTraining: currentlevelTraining,
      trainingType: currentTrainingType,
      trainingTime: currentTrainingTime,
      caloriesReset: Number(formData.get(FormFieldName.caloriesReset)),
      caloriesSpend: Number(formData.get(FormFieldName.caloriesSpend)),
      isReady: true,
      avatarImg: avatarImg
    };

    if (!isNotTrainingType) {
      dispatch(registerUser(data));
    }
  };

  const [currentTrainingType, setCurrentTrainingType] = useState<TrainingType[]>([]);
  const [isNotTrainingType, setIsNotTrainingType] = useState(true);
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

  const [currentlevelTraining, setCurrentlevelTraining] = useState<LevelTraining>();
  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCurrentlevelTraining(value as LevelTraining);
    evt.target.setAttribute('checked', 'true');
  };

  const [currentTrainingTime, setCurrentTrainingTime] = useState<TrainingTime>();
  const handleTrTimeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setCurrentTrainingTime(value as TrainingTime);
    evt.target.setAttribute('checked', 'true');
  };
  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={handleFormSubmit}
            >
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className={`questionnaire-user__block ${isNotTrainingType ? 'custom-input--error' : ''}`}>
                    <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
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

                    <span className="custom-input__error">{isNotTrainingType ? 'Необходимо выбрать 1-3 значений' : '_'}</span>

                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {TRAINING_TIME.map((el) =>
                        (
                          <div className="custom-toggle-radio__block" key={el}>
                            <label>
                              {el === TrainingTime.Time30 ?
                                (
                                  <input
                                    type="radio"
                                    name="time"
                                    id={el}
                                    value={el}
                                    required
                                    onChange={handleTrTimeChange}
                                  />
                                )
                                :
                                (
                                  <input
                                    type="radio"
                                    name="time"
                                    id={el}
                                    value={el}
                                    onChange={handleTrTimeChange}
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
                  <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
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
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              name={FormFieldName.caloriesReset}
                              required
                              min="1000"
                              max="5000"
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              name={FormFieldName.caloriesSpend}
                              required
                              min="1000"
                              max="5000"
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireUserForm;
