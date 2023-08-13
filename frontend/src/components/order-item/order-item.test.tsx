import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import OrderItem from './order-item';
import { makeFakeOrder} from '../../utils/mocks';
import { UserRole } from '../../types/user';

const mockStore = configureMockStore();
const fakeOrder = makeFakeOrder();


const store = mockStore({
  DATA_ORDERS: {orders: [fakeOrder], order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0}
});


describe('Component: OrderItem', () => {
  it('should render "OrderItem"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OrderItem
              order={fakeOrder}
              currentUserRole={UserRole.User}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeOrder.nameTraining)).toBeInTheDocument();
    expect(screen.getByText(`#${fakeOrder.caloriesReset}ккал`)).toBeInTheDocument();
    expect(screen.getByText(fakeOrder.descriptionTraining)).toBeInTheDocument();

  });
});
