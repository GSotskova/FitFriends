import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PopupMap from './popup-map';
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

describe('Component: PopupMap', () => {
  it('should render "PopupMap"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupMap
              userName={fakeUserFull.userName}
              metro={fakeUserFull.location}
              handleClose={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeUserFull.userName)).toBeInTheDocument();
    expect(screen.getByText(`м. ${fakeUserFull.location}`)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();

  });
});
