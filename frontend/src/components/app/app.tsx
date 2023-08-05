/* eslint-disable no-console */
import { Route, Routes } from 'react-router-dom';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../constants';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import AccountCoachPage from '../../pages/personal-account-coach/personal-account-coach';
import PrivateRoute from '../private-route/private-route';
import MyTrainingsPage from '../../pages/my-trainings/my-trainings';
import CreateTrainingPage from '../../pages/create-training/create-training';
import FriendsListPage from '../../pages/friends-list-coach/friends-list-coach';
import { getAuthCheckedStatus, getAuthInfo, getAuthInfoDataLoadingStatus, getAuthorizationStatus, getSignUserLoading, getUserFullInfo } from '../../store/user-process/selectors';
import { fetchCatalogTrainings,fetchCountTrainings, fetchCoachFriends, fetchCoachOrders, fetchCoachTrainings, fetchUser, fetchUserCatalog, fetchUserFriends, fetchUserOrders, fetchUserTrainings, fetchCountFriends, fetchCountUsers, fetchCountOrders, fetchNotify } from '../../store/api-actions';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import MyOrdersPage from '../../pages/my-orders/my-orders';
import MainPage from '../../pages/main-page/main-page';
import { UserRole } from '../../types/user';
import CatalogTrainingsPage from '../../pages/catalog-trainings/catalog-trainings';
import CatalogUsersPage from '../../pages/catalog-users/catalog-users';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NotAuthRoute from '../not-auth-route/not-auth-route';
import TrainingCardPage from '../../pages/training-card/training-card';
import FriendsListUserPage from '../../pages/friends-list-user/friends-list-user';
import UserBuyPage from '../../pages/user-buy/user-buy';
import AccountUserPage from '../../pages/personal-account-user/personal-account-user';
import UserCardPage from '../../pages/user-card/user-card';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const userData = useAppSelector(getAuthInfo);
  const userFullInfo = useAppSelector(getUserFullInfo);
  const isAuthInfoLoading = useAppSelector(getAuthInfoDataLoadingStatus);
  const isUserLoading = useAppSelector(getSignUserLoading);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth ) {
      dispatch(fetchUser());
    } }, [authorizationStatus, dispatch]);


  useEffect(() => {
    if (userData) {
      dispatch(fetchCountTrainings(userData.role));
      dispatch(fetchCountFriends(userData.role));
      dispatch(fetchCountOrders(userData.role));
      dispatch(fetchNotify());
    }
    if (userData?.role === UserRole.User) {
      dispatch(fetchUserTrainings(userFullInfo));
      dispatch(fetchCatalogTrainings());
      dispatch(fetchCountUsers());
      dispatch(fetchUserCatalog());
      dispatch(fetchUserOrders());
      dispatch(fetchUserFriends());
    }
    if (userData?.role === UserRole.Coach && userData.id) {
      dispatch(fetchCoachTrainings());
      dispatch(fetchCoachFriends());
      dispatch(fetchCoachOrders());
    }
  }, [dispatch, userData, userData?.id, userData?.role, userFullInfo]);

  if (!isAuthChecked || isAuthInfoLoading || isUserLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === userData?.role}

          >
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Users}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === userData?.role}
          >
            <CatalogUsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Intro}
        element={<IntroPage />}
      />
      <Route
        path={AppRoute.Login}
        element={
          <NotAuthRoute
            restrictedFor={authorizationStatus}
            userRole={userData?.role}
          >
            <LoginPage />
          </NotAuthRoute>
        }
      />
      <Route
        path={AppRoute.Registration}
        element={<RegistrationPage />}
      />
      <Route
        path={AppRoute.AccountCoach}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === userData?.role}>
            <AccountCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.AccountUser}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.User === userData?.role}>
            <AccountUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/trainings`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.Coach === userData?.role}
          >
            <MyTrainingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/orders`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === userData?.role}>
            <MyOrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountUser}/orders`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.User === userData?.role}>
            <UserBuyPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/trainings/create`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === userData?.role}>
            <CreateTrainingPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/friends`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === userData?.role}>
            <FriendsListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountUser}/friends`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.User === userData?.role}>
            <FriendsListUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Training}/catalog`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === userData?.role}
          >
            <CatalogTrainingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Training}/:id`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole
          >
            <TrainingCardPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Users}/:id`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole
          >
            <UserCardPage />
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
