import { useState } from 'react';
import QuestionnaireCoachForm from '../../components/questionnaire-coach-form/questionnaire-coach-form';
import QuestionnaireUserForm from '../../components/questionnaire-user-form/questionnaire-user-form';
import UserRegistrationForm from '../../components/user-registration-form/user-registration-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserGeneralInfo } from '../../store/user-process/selectors';
import { setUserGeneralInfo } from '../../store/user-process/user-process';
import { UserGeneral, UserRole } from '../../types/user';


function RegistrationPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const userDataCurrent = useAppSelector(getUserGeneralInfo);

  const [avatarImg, setAvatar] = useState<File>();
  const handleFormSubmit = (userData: UserGeneral, file: File) => {
    dispatch(setUserGeneralInfo({userData}));
    setAvatar(file);
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
        {!userDataCurrent?.email &&
                (<UserRegistrationForm onSubmit={handleFormSubmit} />)}
        {(userDataCurrent?.email && userDataCurrent?.role === UserRole.Coach) &&
                  (<QuestionnaireCoachForm userData={userDataCurrent} avatarImg={avatarImg}/>) }
        {(userDataCurrent?.email && userDataCurrent?.role === UserRole.User) &&
                  (<QuestionnaireUserForm />)}
      </main>
    </div>

  );
}

export default RegistrationPage;
