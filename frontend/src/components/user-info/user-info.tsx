import { useEffect, useRef, useState } from 'react';
import { LEVEL_TRAIN_ARR, LevelTraining, TRAINING_ARR, TrainingType } from '../../types/questionnaire';
import { USER_SEX_ARR, UserFullInfo, UserRole, UserSex } from '../../types/user';
import { STATION_METRO, StationMetro } from '../../types/station-metro';
import { DescriptionLn } from '../../constants';
import { editUser } from '../../store/api-actions-user';
import { useAppDispatch } from '../../hooks';

type Props = {
  user: UserFullInfo;
}

const UserInfo = ({user}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isEditForm, setSignEditForm] = useState<boolean>(false);
  const handleEditButtonClick = () => {
    setSignEditForm((prevIsEditForm) => !prevIsEditForm);
  };

  const ARIA_BUTTONS_STATE = {location: false, sex: false, levelTr: false};
  const [isOpened, setIsOpened] = useState(ARIA_BUTTONS_STATE);
  const handleToggleButtonClick = (nameAria: string) => {
    if (nameAria === 'location' || nameAria === 'sex' || nameAria === 'levelTr') {
      setIsOpened({...isOpened, [nameAria]: !isOpened[nameAria]});
    }
  };

  const ARIA_LIST_BOX = {location: user.location, sex: user.sex, levelTr: user.levelTraining};
  const [currentAria, setAria] = useState(ARIA_LIST_BOX);
  const handleAriaChange = (evt: React.MouseEvent<HTMLLIElement>, nameAria: string) => {
    setIsOpened({...isOpened, [nameAria]: false});
    if(nameAria === 'location') {setAria({...currentAria, location: evt.currentTarget.innerText as StationMetro});}
    if(nameAria === 'sex') {setAria({...currentAria, sex: evt.currentTarget.innerText as UserSex});}
    if(nameAria === 'levelTr') {setAria({...currentAria, levelTr: evt.currentTarget.innerText as LevelTraining});}
    evt.currentTarget.setAttribute('aria-selected', 'true');
  };

  const [currentTrainingType, setCurrentTrainingType] = useState(user.trainingType);
  const [isNotTrainingType, setIsNotTrainingType] = useState(!(user.trainingType.length >= 1 && user.trainingType.length <= 3));
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

  const USER_INFO = {
    userName: user.userName, description: user.description,
    isPersonal: user.role === UserRole.Coach ? user.isPersonal : user.isReady,
    isReady: user.isReady};
  const [currentInfo, setInfo] = useState(USER_INFO);
  const handleInfoChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    if (name === 'isPersonal') {
      const signPersonal = !currentInfo.isPersonal;
      setInfo({...currentInfo, isPersonal: signPersonal, isReady: signPersonal});
    } else {
      setInfo({...currentInfo, [name]: value});
    }
  };

  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      currentInfo.description && (currentInfo.description.length < DescriptionLn.MinLength
      || currentInfo.description.length > DescriptionLn.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [currentInfo.description]);

  const [photoUser, setPhoto] = useState<File | undefined>();
  const handlePhotoUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setPhoto(evt.target.files[0]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handlePhotoDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setPhoto(undefined);
    }
  };


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      userName: currentInfo.userName,
      description: currentInfo.description,
      isPersonal: currentInfo.isPersonal,
      isReady: currentInfo.isPersonal,
      avatarImg: photoUser,
      levelTraining: currentAria.levelTr,
      sex: currentAria.sex,
      trainingType: currentTrainingType,
      location: currentAria.location
    };

    if (!isNotTrainingType) {
      dispatch(editUser(data));
      setSignEditForm(false);
    }
  };

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              id="photoUser"
              name="photoUser"
              accept="image/png, image/jpeg"
              ref={inputRef}
              onChange={handlePhotoUpload}
              disabled={!isEditForm}
            />
            <span className="input-load-avatar__avatar">
              {photoUser ? (
                <img src={URL.createObjectURL(photoUser)} width={98} height={98} alt='user avatar' />
              ) : (
                <img src={user.avatarPath} width={98} height={98} alt='user avatar' />
              )}

            </span>
          </label>
        </div>
        {isEditForm &&
        (
          <div className="user-info-edit__controls">
            <label
              className="user-info-edit__control-btn"
              aria-label="обновить"
              htmlFor="photoUser"
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </label>
            <button
              className="user-info-edit__control-btn"
              aria-label="удалить"
              onClick={handlePhotoDelete}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        )}
      </div>
      <form
        className="user-info-edit__form"
        action="#"
        method="post"
        onSubmit={handleFormSubmit}
      >
        {isEditForm && (
          <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" aria-label="Сохранить">
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Сохранить</span>
          </button>
        )}
        {!isEditForm && (
          <button
            className="btn-flat btn-flat--underlined user-info__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={handleEditButtonClick}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>Редактировать</span>
          </button>
        )}
        <div className={`user-info${isEditForm ? '-edit' : ''}__section`}>
          <h2 className={`user-info${isEditForm ? '-edit' : ''}__title`}>Обо мне</h2>
          <div className={`custom-input ${isEditForm ? '' : 'custom-input--readonly'} user-info${isEditForm ? '-edit' : ''}__input`}>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  disabled={!isEditForm}
                  name="userName"
                  minLength={1}
                  maxLength={15}
                  pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                  title="Только буквы русского/английского алфавита"
                  value={currentInfo.userName}
                  onChange={handleInfoChange}
                  data-testid="userName"
                />
              </span>
            </label>
          </div>
          <div className={`custom-textarea ${isEditForm ? '' : 'custom-textarea--readonly'} user-info${isEditForm ? '-edit' : ''}__textarea`}>
            <label><span className="custom-textarea__label ">Описание</span>
              <span className="custom-input--error">
                <textarea
                  name="description"
                  disabled={!isEditForm}
                  onChange={handleInfoChange}
                  value={currentInfo.description}
                  data-testid="description"
                >
                </textarea>
                {isNotCorrectLength &&
                          <span className="custom-textarea__error">Минимальная длина 10 символ. Максимальная длина 140 символов</span>}
              </span>
            </label>
          </div>
        </div>
        <div className={`user-info${isEditForm ? '-edit' : ''}__section user-info${isEditForm ? '-edit' : ''}__section--status`}>
          <h2 className={`user-info${isEditForm ? '-edit' : ''}__title user-info${isEditForm ? '-edit' : ''}__title--status`}>Статус</h2>
          <div className={`custom-toggle custom-toggle--switch user-info${isEditForm ? '-edit' : ''}__toggle`}>
            <label>
              <input
                type="checkbox"
                name="isPersonal"
                checked={currentInfo.isPersonal}
                onChange={handleInfoChange}
                disabled={!isEditForm}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">Готов тренировать</span>
            </label>
          </div>
        </div>
        <div className={`user-info${isEditForm ? '-edit' : ''}__section ${isNotTrainingType ? 'custom-input--error' : ''}`}>
          <h2 className={`user-info${isEditForm ? '-edit' : ''}__title user-info${isEditForm ? '-edit' : ''}__title--specialization`}>
            Специализация
          </h2>
          <div className={`specialization-checkbox user-info${isEditForm ? '-edit' : ''}__specialization`}>
            {TRAINING_ARR.map((el) => (
              <div className="btn-checkbox" key={el}>
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialisation"
                    value={el}
                    id={el}
                    checked={!!currentTrainingType.find((item)=> el === item)}
                    onChange={handleTrTypeChange}
                    disabled={!isEditForm}
                  />
                  <span className="btn-checkbox__btn">{el}</span>
                </label>
              </div>
            ))}
          </div>
          {isNotTrainingType && isEditForm && <span className="custom-input__error">Необходимо выбрать 1-3 значений</span>}
        </div>
        <div
          className={`${isEditForm ? '' : 'custom-select--readonly'} custom-select ${isOpened.location ? 'is-open' : 'custom-select--not-selected'} user-info${isEditForm ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">ст. м. {currentAria.location}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={()=>handleToggleButtonClick('location')}
            disabled={!isEditForm}
          >
            <span className="custom-select__text">{currentAria.location}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {STATION_METRO.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={currentAria.location === el}
                  onClick={(evt)=>handleAriaChange(evt, 'location')}
                >
                  {el}
                </li>
              ))}
          </ul>
        </div>
        <div className={`${isEditForm ? '' : 'custom-select--readonly'} custom-select ${isOpened.sex ? 'is-open' : 'custom-select--not-selected'} user-info${isEditForm ? '-edit' : ''}__select`}>
          <span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{currentAria.sex}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={()=>handleToggleButtonClick('sex')}
            disabled={!isEditForm}
          >
            <span className="custom-select__text">{currentAria.sex}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {USER_SEX_ARR.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={currentAria.sex === el}
                  onClick={(evt)=>handleAriaChange(evt, 'sex')}
                >
                  {el}
                </li>
              ))}
          </ul>
        </div>
        <div className={`${isEditForm ? '' : 'custom-select--readonly'} custom-select  ${isOpened.levelTr ? 'is-open' : 'custom-select--not-selected'} user-info${isEditForm ? '-edit' : ''}__select`}>
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{currentAria.levelTr}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={()=>handleToggleButtonClick('levelTr')}
            disabled={!isEditForm}
          >
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {LEVEL_TRAIN_ARR.map((el) =>
              (
                <li
                  key={el}
                  role="option"
                  tabIndex={0}
                  className="custom-select__item"
                  aria-selected={currentAria.levelTr === el}
                  onClick={(evt)=>handleAriaChange(evt, 'levelTr')}
                >
                  {el}
                </li>
              ))}
          </ul>
        </div>
      </form>
    </section>
  );
};

export default UserInfo;
