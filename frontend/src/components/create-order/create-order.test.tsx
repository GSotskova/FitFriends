import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CreateOrder from './create-order';
import { makeFakeOrder, makeFakeTraining} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const fakeOrder = makeFakeOrder();
const fakeTraining = makeFakeTraining();

const store = mockStore({
  DATA_ORDERS: {orders: [fakeOrder], order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_TRAININGS: {trainings: [fakeTraining],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
});


describe('Component: CreateOrder', () => {
  it('should render "CreateOrder"', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CreateOrder
              training={fakeTraining}
              handleClose={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeTraining.nameTraining ? fakeTraining.nameTraining : '')).toBeInTheDocument();

    const [paymentOption1,paymentOption2,paymentOption3,,,] = screen.getAllByRole('radio');

    await userEvent.click(paymentOption1);
    expect(paymentOption1).toBeChecked();

    await userEvent.click(paymentOption2);
    expect(paymentOption2).toBeChecked();

    await userEvent.click(paymentOption3);
    expect(paymentOption3).toBeChecked();

  });
});
