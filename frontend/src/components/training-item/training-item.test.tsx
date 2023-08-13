import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import TrainingItem from './training-item';
import { makeFakeTraining} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeTraining = makeFakeTraining();

const store = mockStore({
  DATA_TRAININGS: {trainings: [fakeTraining],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
});

describe('Component: TrainingItem', () => {
  it('should render "TrainingItem"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingItem
              training={fakeTraining}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeTraining.trainingType ? `#${fakeTraining.trainingType}` : '')).toBeInTheDocument();
    expect(screen.getByText(fakeTraining.nameTraining ? fakeTraining.nameTraining : '')).toBeInTheDocument();

  });
});
