import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import UserCardPage from './user-card';
import { makeFakeTraining, makeFakeUserFullInfo, makeFakeComment, makeFakeOrder, makeFakeUserCoach} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, FormRegistration } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeTraining = Array.from({length: 4}, () => makeFakeTraining());
const fakeUserFull = makeFakeUserFullInfo();
const fakeUserOther = makeFakeUserCoach();
const fakeComments = Array.from({length: 5}, () => makeFakeComment());
const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: fakeUserOther, isUserOtherLoading: false, countUsers: 0},
  DATA_FRIENDS: {friends: [], countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false},
  DATA_TRAININGS: {trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: fakeTraining,
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false},
  DATA_COMMENT: {comments: fakeComments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false},
  DATA_ORDERS: {orders: fakeOrders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_SUBSCRIBE: {hasErrorPost: false, hasErrorDelete: false, isSubscrLoadPost: false, isSubscrLoadDelete: false},
  DATA_REQUEST: {hasErrorPost: false, hasErrorDelete: false, isLoadPost: false, isLoadDelete: false}
});
const history = createMemoryHistory();

describe('Component: UserCardPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserCardPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(fakeUserOther.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeUserOther.location)).toBeInTheDocument();
  });

});
