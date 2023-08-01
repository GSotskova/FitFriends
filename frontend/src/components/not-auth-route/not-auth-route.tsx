import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { UserRole } from '../../types/user';


type NotAuthRouteProps = {
  restrictedFor: AuthorizationStatus;
  userRole?: UserRole;
  children: JSX.Element;
}

const NotAuthRoute = ({ children, restrictedFor, userRole}: NotAuthRouteProps): JSX.Element => {
  console.log('NotAuthRoute', restrictedFor, userRole);
  if (AuthorizationStatus.Auth === restrictedFor && userRole === UserRole.Coach)
  {
    return <Navigate to={AppRoute.AccountCoach} />;
  }
  if (AuthorizationStatus.Auth === restrictedFor && userRole === UserRole.User)
  {
    console.log('Navigate', restrictedFor, userRole);
    return <Navigate to={AppRoute.Main} />;

  }
  return children;
};

export default NotAuthRoute;

