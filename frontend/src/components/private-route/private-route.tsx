import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { fetchCoachFriends, fetchCoachOrders, fetchCoachTrainings } from '../../store/api-actions';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
  nameSpace?: NameSpace;
}

const PrivateRoute = ({ children, restrictedFor, redirectTo, nameSpace}: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  if (nameSpace === NameSpace.DataTrainings ) {dispatch(fetchCoachTrainings());}
  if (nameSpace === NameSpace.DataFriends ) {dispatch(fetchCoachFriends());}
  if (nameSpace === NameSpace.DataOrders ) {dispatch(fetchCoachOrders());}
  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
