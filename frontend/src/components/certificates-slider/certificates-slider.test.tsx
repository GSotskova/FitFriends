import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CertificateSlider from './certificates-slider';
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

describe('Component: CertificateSlider', () => {
  it('should render "CertificateSlider"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CertificateSlider
              coachInfo={fakeUserCoach}
              isPopup={false}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
