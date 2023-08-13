import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CertificateItem from './certificate-item';
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


describe('Component: CertificateItem', () => {
  it('should render "CertificateItem"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CertificateItem
              certificateId={fakeUserFull.certificatesPath[0].certificateId}
              certificatePath={fakeUserFull.certificatesPath[0].certificatePath}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('object')).toBeInTheDocument();

  });
});
