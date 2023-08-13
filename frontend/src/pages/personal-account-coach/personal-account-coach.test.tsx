import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import AccountCoachPage from './personal-account-coach';
import { makeFakeTraining, makeFakeUserFullInfo, makeFakeFriend, makeFakeOrder, makeFakeNotify} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AppRoute, AuthorizationStatus, FormRegistration} from '../../constants';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFullInfo());
const fakeFriends = Array.from({length: 5}, () => makeFakeFriend());
const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());
const fakeNotifys = Array.from({length: 5}, () => makeFakeNotify());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull[1], hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull[1], isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_FRIENDS: {friends: fakeFriends, countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false},
  DATA_TRAININGS: {trainings: fakeTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: fakeTrainings, coachTrainings: fakeTrainings,
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_ORDERS: {orders: fakeOrders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_NOTIFY: {notifications: fakeNotifys, hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false}
});


const history = createMemoryHistory();

describe('Component: AccountCoachPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <AccountCoachPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    const trainingLink: HTMLAnchorElement = screen.getByTestId('trainings');
    expect(trainingLink.href).toContain(`${AppRoute.AccountCoach}/trainings`);

    const friendLink: HTMLAnchorElement = screen.getByTestId('friends');
    expect(friendLink.href).toContain(`${AppRoute.AccountCoach}/friends`);

  });

});
