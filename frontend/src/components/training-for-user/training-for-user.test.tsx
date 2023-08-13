import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import TrainingForUser from './training-for-user';
import { makeFakeTraining} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());

const store = mockStore({
  DATA_TRAININGS: {trainings: fakeTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
});

describe('Component: TrainingForUser', () => {
  it('should render "TrainingForUser"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingForUser
              userTrainings={fakeTrainings}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
