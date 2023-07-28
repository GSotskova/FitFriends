import { Route, Routes } from 'react-router-dom';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../constants';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import AccountCoachPage from '../../pages/personal-account-coach/personal-account-coach';
import PrivateRoute from '../private-route/private-route';
import MyTrainingsPage from '../../pages/my-trainings/my-trainings';
import CreateTrainingPage from '../../pages/create-training/create-training';
import FriendsListPage from '../../pages/friends-list-coach/friends-list-coach';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { fetchUser } from '../../store/api-actions';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import MyOrdersPage from '../../pages/my-orders/my-orders';
import MainPage from '../../pages/main-page/main-page';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUser());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage />}
      />
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
        path={`${AppRoute.AccountCoach}/trainings`}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login} nameSpace={NameSpace.DataTrainings}>
            <MyTrainingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/orders`}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login} nameSpace={NameSpace.DataOrders}>
            <MyOrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/trainings/create`}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login} nameSpace={NameSpace.DataTrainings}>
            <CreateTrainingPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/friends`}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login} nameSpace={NameSpace.DataFriends}>
            <FriendsListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
