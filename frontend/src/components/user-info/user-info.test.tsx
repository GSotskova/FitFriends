import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import UserInfo from './user-info';
import {makeFakeUserFullInfo} from '../../utils/mocks';
import { AuthorizationStatus, FormRegistration } from '../../constants';
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


describe('Component: UserInfo', () => {
  it('should render "UserInfo"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserInfo
              user={fakeUserFull}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Обо мне/i)).toBeInTheDocument();

    expect(screen.getByDisplayValue(fakeUserFull.userName)).toHaveAttribute('name', 'userName');
    expect(screen.getByDisplayValue(fakeUserFull.description)).toHaveAttribute('name', 'description');


  });
});
