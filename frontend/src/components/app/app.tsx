import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import AccountCoachPage from '../../pages/personal-account-coach/personal-account-coach';
import PrivateRoute from '../private-route/private-route';
import MyTrainingsPage from '../../pages/my-trainings/my-trainings';


function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Intro}
        element={<IntroPage />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Registration}
        element={<RegistrationPage />}
      />
      <Route
        path={AppRoute.AccountCoach}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
            <AccountCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/trainings/:id`}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
            <MyTrainingsPage />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;
