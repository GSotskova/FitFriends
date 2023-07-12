import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';


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
    </Routes>
  );
}

export default App;
