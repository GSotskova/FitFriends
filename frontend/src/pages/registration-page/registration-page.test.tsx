import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import RegistrationPage from './registration-page';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AuthorizationStatus, FormRegistration} from '../../constants';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: null, hasErrorLogin: false,
    userData: null, userFullInfo: null, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
});


const history = createMemoryHistory();

describe('Component: RegistrationPage', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <RegistrationPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    await userEvent.type(screen.getByTestId('mail'), 'mail@mail.ru');
    await userEvent.type(screen.getByTestId('userName'), 'User Name');

    expect(screen.getByDisplayValue(/mail@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/User Name/i)).toBeInTheDocument();
  });

});
