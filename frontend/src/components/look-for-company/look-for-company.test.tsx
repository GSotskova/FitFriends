import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import LookForCompany from './look-for-company';
import { makeFakeUserFullInfo} from '../../utils/mocks';
import {AuthorizationStatus, FormRegistration} from '../../constants';

const mockStore = configureMockStore();
const fakeUserCatalog = Array.from({length: 5}, () => makeFakeUserFullInfo());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: null, hasErrorLogin: false,
    userData: null, userFullInfo: null, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserCatalog, userOther: null, isUserOtherLoading: false, countUsers: 0},
});

describe('Component: LookForCompany', () => {
  it('should render "LookForCompany"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LookForCompany
              users={fakeUserCatalog}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
