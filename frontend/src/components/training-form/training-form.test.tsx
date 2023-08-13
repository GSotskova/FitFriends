import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import TrainingForm from './training-form';
import { makeFakeTraining, makeFakeOrder} from '../../utils/mocks';
import { UserRole } from '../../types/user';

const mockStore = configureMockStore();
const fakeTraining = makeFakeTraining();
const fakeOrder = makeFakeOrder();

const store = mockStore({
  DATA_TRAININGS: {trainings: [fakeTraining],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_ORDERS: {orders: [fakeOrder], order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0}
});


describe('Component: TrainingForm', () => {
  it('should render "TrainingForm"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingForm
              training={fakeTraining}
              role={UserRole.Coach}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Информация о тренировке')).toBeInTheDocument();
    expect(screen.getByText('Редактировать')).toBeInTheDocument();

    expect(screen.getByTestId('nameTraining')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();

  });
});
