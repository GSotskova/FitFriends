import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { USER_ROLE_ARR, USER_SEX_ARR, UserRegister, UserRole, UserRoleTxt, UserSex, UserSexTxt } from '../../types/user';
import { STATION_METRO, StationMetro } from '../../types/station-metro.enum';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkEmail } from '../../store/api-actions';
import { getcheckEmail } from '../../store/user-process/selectors';
import './user-registration-form.css';

enum FormFieldName {
  userName = 'userName',
  email = 'email',
  avatar = 'avatar',
  sex = 'sex',
  dateBirth = 'dateBirth',
  role = 'role',
  description = 'description',
  location = 'location',
  password = 'password'
}

type UserRegistrationFormProps = {
 onSubmit: (userData: UserRegister) => void;
};


const UserRegistrationForm = ({onSubmit}: UserRegistrationFormProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const isEmailExists = useAppSelector(getcheckEmail);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      userName: String(formData.get(FormFieldName.userName)),
      email: String(formData.get(FormFieldName.email)),
      avatar: String(photoUser),
      sex: currentSex,
      dateBirth: String(formData.get(FormFieldName.dateBirth)),
      role: currentRole,
      description: String(formData.get(FormFieldName.description)),
      password: String(formData.get(FormFieldName.password)),
      location: String(currentMetro)
    };
    if (!isEmailExists && currentMetro) {
      onSubmit(data);
    }

  };

  const handleInputEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(checkEmail({login: evt.target.value, password: ' '}));
  };

  const [photoUser, setPhoto] = useState<File | undefined>();
  const handlePhotoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setPhoto(evt.target.files[0]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [currentSex, setSex] = useState(UserSex.None);
  const handleSexChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    let sex = UserSex.None;
    switch ( value ) {
      case UserSexTxt.Male:
        sex = UserSex.Male;
        break;
      case UserSexTxt.Female:
        sex = UserSex.Female;
        break;
      default:
        sex = UserSex.None;
        break;
    }
    setSex(sex);
    evt.target.setAttribute('checked', 'true');
  };


  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleToggleButtonClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };
  const [currentMetro, setMetro] = useState<string | null>(StationMetro.Petrogradskaya);
  const handleMetroChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    setMetro(evt.currentTarget.innerText);
    evt.currentTarget.setAttribute('aria-selected', 'true');
    setIsOpened(false);
  };

  const [currentRole, setCurrentRole] = useState(UserRole.Coach);
  const handleRoleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    const role = value === UserRoleTxt.Coach ? UserRole.Coach : UserRole.User;
    setCurrentRole(role);
    evt.target.setAttribute('checked', 'true');
  };


  const [agreement, setAgreement] = useState(false);
  const handleAgreementChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (agreement) {
      setAgreement(false);
      evt.target.removeAttribute('checked');
    }
    setAgreement(true);
    evt.target.setAttribute('checked', 'true');
  };


  return (
    <div className="popup-form__form">
      <form
        method="get"
        onSubmit={handleFormSubmit}
      >
        <div className="sign-up">
          <div className="sign-up__load-photo">
            <div className="input-load-avatar">
              <label>
                <input
                  className="visually-hidden"
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                  required
                  onChange={handlePhotoUpload}
                />
                {photoUser ? (
                  <img
                    src={URL.createObjectURL(photoUser)}
                    alt="Avatar preview"
                    className="register-form__avatar-preview"
                  />
                ) : (
                  <span className="input-load-avatar__btn" >
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import"></use>
                    </svg>
                  </span>
                )}
              </label>
            </div>
            <div className="sign-up__description">
              <h2 className="sign-up__legend">Загрузите фото профиля</h2>
              <span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
            </div>
          </div>
          <div className="sign-up__data">
            <div className="custom-input">
              <label><span className="custom-input__label">Имя</span>
                <span className="custom-input__wrapper">
                  <input type="text" name={FormFieldName.userName} required/>
                </span>
              </label>
            </div>
            <div className="custom-input">
              <label><span className="custom-input__label">E-mail</span>
                <span className="custom-input__wrapper custom-input--error">
                  <input
                    type="email"
                    name={FormFieldName.email}
                    onChange={handleInputEmail}
                    required
                  />
                  {isEmailExists &&
                <span className="custom-input__error">Пользователь с таким email уже зарегистрирован</span>}
                </span>

              </label>
            </div>
            <div className="custom-input">
              <label><span className="custom-input__label">Дата рождения</span>
                <span className="custom-input__wrapper">
                  <input type="date" name={FormFieldName.dateBirth} max="2099-12-31" required/>
                </span>
              </label>
            </div>
            <div className={`custom-select ${isOpened ? 'is-open' : 'custom-select--not-selected'} not-empty`}>
              <span className="custom-select__label">Ваша локация</span>
              <button
                className="custom-select__button"
                type="button"
                aria-label="Выберите одну из опций"
                onClick={handleToggleButtonClick}
              >
                <span className="custom-select__text">{currentMetro}</span>
                <span className="custom-select__icon">
                  <svg width="15" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-down"></use>
                  </svg>
                </span>
              </button>

              <ul className="custom-select__list" role="listbox" >
                {STATION_METRO.map((el) =>
                  (
                    <li
                      key={el}
                      role="option"
                      tabIndex={0}
                      className="custom-select__item"
                      aria-selected={currentMetro === el}
                      onClick={handleMetroChange}
                    >
                      {el}
                    </li>
                  ))}
              </ul>

            </div>
            <div className="custom-input">
              <label><span className="custom-input__label">Пароль</span>
                <span className="custom-input__wrapper">
                  <input
                    type="password"
                    name={FormFieldName.password}
                    autoComplete="off"
                    required
                    minLength={6}
                    maxLength={12}
                  />
                </span>
              </label>
            </div>
            <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
              <div className="custom-toggle-radio custom-toggle-radio--big">
                {USER_SEX_ARR.map((el) => (
                  <div className="custom-toggle-radio__block" key={el}>
                    <label htmlFor={el}>
                      {el === UserSexTxt.Male ?
                        (
                          <input
                            type="radio"
                            id={el}
                            name="sex"
                            value={el}
                            required
                            onChange={handleSexChange}
                          />
                        )
                        : (
                          <input
                            type="radio"
                            id={el}
                            name="sex"
                            value={el}
                            onChange={handleSexChange}
                          />
                        )}
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">{el}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="sign-up__role">
            <h2 className="sign-up__legend">Выберите роль</h2>
            <div className="role-selector sign-up__role-selector">
              {USER_ROLE_ARR.map((el) => (
                <div className="role-btn" key={el}>
                  <label>
                    {el === UserRoleTxt.Coach
                      ? (
                        <input
                          className="radio-visually-hidden"
                          type="radio"
                          name="role"
                          value={el}
                          id={el}
                          required
                          onChange={handleRoleChange}
                        />
                      )
                      :
                      (
                        <input
                          className="radio-visually-hidden"
                          type="radio"
                          name="role"
                          value={el}
                          id={el}
                          onChange={handleRoleChange}
                        />
                      )}
                    <span className="role-btn__icon">
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref={el === UserRoleTxt.Coach ? '#icon-cup' : '#icon-weight'}></use>
                      </svg>
                    </span><span className="role-btn__btn">{el}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>


          <div className="sign-up__checkbox">
            <label>
              <input
                type="checkbox"
                value="user-agreement"
                name="user-agreement"
                onChange={handleAgreementChange}
                required
              />
              <span className="sign-up__checkbox-icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span><span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
            </label>
          </div>
          <button
            className="btn sign-up__button"
            type="submit"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>


  );
};

export default UserRegistrationForm;
