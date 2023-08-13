import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PopupCertificates from './popup-certificates';
import { makeFakeUserCoach} from '../../utils/mocks';
import {AuthorizationStatus, FormRegistration} from '../../constants';

const mockStore = configureMockStore();
const fakeUserCoach = makeFakeUserCoach();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserCoach, hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserCoach, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
});

describe('Component: PopupCertificates', () => {
  it('should render "PopupCertificates"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupCertificates
              coachInfo={fakeUserCoach}
              handleClose={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Сертификаты тренера')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
