import QuestionnaireCoachForm from '../../components/questionnaire-coach-form/questionnaire-coach-form';
import QuestionnaireUserForm from '../../components/questionnaire-user-form/questionnaire-user-form';
import UserRegistrationForm from '../../components/user-registration-form/user-registration-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserGeneralInfo } from '../../store/user-process/selectors';
import { setUserGeneralInfo } from '../../store/user-process/user-process';
import { UserRegister, UserRole } from '../../types/user';


function RegistrationPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const userDataCurrent = useAppSelector(getUserGeneralInfo);

  const handleFormSubmit = (userData: UserRegister) => {
    dispatch(setUserGeneralInfo({userData}));
  };

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                {!userDataCurrent?.email &&
                (<UserRegistrationForm onSubmit={handleFormSubmit} />)}
                {(userDataCurrent?.email && userDataCurrent?.role === UserRole.Coach) &&
                  (<QuestionnaireCoachForm />) }
                {(userDataCurrent?.email && userDataCurrent?.role === UserRole.User) &&
                  (<QuestionnaireUserForm />)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default RegistrationPage;
