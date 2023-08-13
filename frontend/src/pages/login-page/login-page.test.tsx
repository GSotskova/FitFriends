import {render, screen} from '@testing-library/react';
import LoginPage from './login-page';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constants';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});
describe('Component: LoginPage', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>,
      </Provider>
    );

    await userEvent.type(screen.getByTestId('mail'), 'mail@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456ab');

    expect(screen.getByDisplayValue(/mail@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456ab/i)).toBeInTheDocument();
  });


});
