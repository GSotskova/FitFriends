import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import TrainingCardPage from './training-card';
import { makeFakeTraining, makeFakeUserFullInfo, makeFakeComment, makeFakeOrder} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, FormRegistration } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeTraining = makeFakeTraining();
const fakeUserFull = makeFakeUserFullInfo();
const fakeComments = Array.from({length: 5}, () => makeFakeComment());
const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_TRAININGS: {trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: fakeTraining,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false},
  DATA_COMMENT: {comments: fakeComments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false},
  DATA_ORDERS: {orders: fakeOrders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
});
const name = fakeTraining.nameTraining ? fakeTraining.nameTraining : ' ';
const history = createMemoryHistory();

describe('Component: TrainingCardPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingCardPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toHaveAttribute('name', 'nameTraining');
  });

});
