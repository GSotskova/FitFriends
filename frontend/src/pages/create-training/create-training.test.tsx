import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CreateTrainingPage from './create-training';
import { makeFakeUserFullInfo} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, FormRegistration } from '../../constants';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFullInfo());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull[1], hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_TRAININGS: {trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false}
});

const history = createMemoryHistory();

describe('Component: CreateTrainingPage', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CreateTrainingPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    await userEvent.type(screen.getByTestId('nametraining'), 'New training');
    await userEvent.type(screen.getByTestId('price'), '5000');

    expect(screen.getByDisplayValue(/New training/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/5000/i)).toBeInTheDocument();
  });

});
