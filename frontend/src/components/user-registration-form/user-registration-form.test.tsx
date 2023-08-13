import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import UserRegistrationForm from './user-registration-form';
import {makeFakeUserFullInfo} from '../../utils/mocks';
import { StationMetro } from '../../types/station-metro';
import { AuthorizationStatus, FormRegistration } from '../../constants';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserFull = makeFakeUserFullInfo();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
});


describe('Component: UserRegistrationForm', () => {
  it('should render "UserRegistrationForm"', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserRegistrationForm
              onSubmit={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(Object.values(StationMetro).length);

    await userEvent.type(screen.getByTestId('mail'), 'mail@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456ab');

    expect(screen.getByDisplayValue(/mail@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456ab/i)).toBeInTheDocument();
  });
});
