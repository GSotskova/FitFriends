import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute, FormRegistration} from '../../constants';
import App from './app';
import {makeFakeUserFullInfo, makeFakeTraining, makeFakeComment, makeFakeOrder, makeFakeUserCoach} from '../../utils/mocks';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserFull = makeFakeUserFullInfo();
const fakeUserOther = makeFakeUserCoach();
const fakeUserCatalog = Array.from({length: 5}, () => makeFakeUserFullInfo());
const fakeComments = Array.from({length: 5}, () => makeFakeComment());
const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserCatalog, userOther: fakeUserOther, isUserOtherLoading: false, countUsers: 0},
  DATA_FRIENDS: {friends: [], countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false},
  DATA_TRAININGS: {trainings: fakeTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: fakeTrainings[0],
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_COMMENT: {comments: fakeComments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false, isNotifyLoad: false, isNotifyLoadDelete: false},
  DATA_ORDERS: {orders: fakeOrders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_SUBSCRIBE: {hasErrorPost: false, hasErrorDelete: false, isSubscrLoadPost: false, isSubscrLoadDelete: false},
  DATA_REQUEST: {hasErrorPost: false, hasErrorDelete: false, isLoadPost: false, isLoadDelete: false}
});


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Intro);

    render(fakeApp);

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  it(`should render "Training" when user navigate to ${AppRoute.Training}/${fakeTrainings[0].id}`, () => {
    history.push(`${AppRoute.Training}/${fakeTrainings[0].id}`);

    render(fakeApp);
    const name = fakeTrainings[0].nameTraining ? fakeTrainings[0].nameTraining : ' ';
    expect(screen.getByText(/Видео/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toHaveAttribute('name', 'nameTraining');
  });

  it(`should render "Card user" when user navigate to ${AppRoute.Users}/${fakeUserOther.id}`, () => {
    history.push(`${AppRoute.Users}/${fakeUserOther.id}`);

    render(fakeApp);

    expect(screen.getByText(fakeUserOther.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeUserOther.location)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
