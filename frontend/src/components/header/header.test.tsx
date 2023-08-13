import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, FormRegistration} from '../../constants';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeUserFullInfo } from '../../utils/mocks';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUserFull = makeFakeUserFullInfo();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: [], isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false, isNotifyLoad: false, isNotifyLoadDelete: false}
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Header />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('handleMainClick')).toBeInTheDocument();
  });

});
