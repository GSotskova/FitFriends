import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MyOrdersPage from './my-orders';
import { makeFakeTraining, makeFakeUserFullInfo, makeFakeOrder} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, FormRegistration } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFullInfo());
const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull[1], hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_TRAININGS: {trainings: fakeTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: fakeTrainings, coachTrainings: fakeTrainings,
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_ORDERS: {orders: fakeOrders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false}
});

const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: MyOrdersPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyOrdersPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
    expect(screen.getByTestId('orders')).toBeInTheDocument();
  });

});
