import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PopupWindow from './popup-window';
import { makeFakeUserFullInfo} from '../../utils/mocks';
import {AuthorizationStatus, FormRegistration} from '../../constants';

const mockStore = configureMockStore();
const fakeUserFull = makeFakeUserFullInfo();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
});

describe('Component: PopupWindow', () => {
  it('should render "PopupWindow"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupWindow
              handleClose={jest.fn()}
            >
              <h1>Popup window</h1>
            </PopupWindow>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Popup window/i)).toBeInTheDocument();

  });
});
