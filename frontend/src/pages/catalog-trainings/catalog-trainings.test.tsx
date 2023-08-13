import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogTrainingsPage from './catalog-trainings';
import { makeFakeTraining, makeFakeUserFullInfo, makeFakeNotify} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, FormRegistration } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFullInfo());
const fakeNotifys = Array.from({length: 5}, () => makeFakeNotify());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull[1], hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_TRAININGS: {trainings: fakeTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: fakeTrainings, coachTrainings: fakeTrainings,
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_NOTIFY: {notifications: fakeNotifys, hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false}
});
const name = fakeTrainings[0].nameTraining ? fakeTrainings[0].nameTraining : ' ';

const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: CatalogTrainingsPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogTrainingsPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByTestId('trainings')).toBeInTheDocument();
  });

});
