import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import IntroPage from './intro-page';
import {Provider} from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: IntroPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <IntroPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });

});
