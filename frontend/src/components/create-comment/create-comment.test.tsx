import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import CreateComment from './create-comment';
import {makeFakeUserFullInfo, makeFakeTraining, makeFakeComment} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeUserFull = makeFakeUserFullInfo();
const fakeComments = Array.from({length: 5}, () => makeFakeComment());
const fakeTraining = makeFakeTraining();

const store = mockStore({
  DATA_COMMENT: {comments: fakeComments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false}
});


describe('Component: CreateComment', () => {
  it('should render "CreateComment"', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CreateComment
            trainingId={fakeTraining.id}
            userId={fakeUserFull.id}
            handleClose={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оцените тренировку/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(5);

    await userEvent.type(screen.getByTestId('textarea'), 'Минимальная длина 100 символ. Максимальная длина 1024 символов...................................................................');

    expect(screen.getByDisplayValue(/Минимальная длина 100 символ. Максимальная длина 1024 символов.................................................................../i)).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();


    const [rating1,rating2,,,] = screen.getAllByRole('radio');

    await userEvent.click(rating1);
    expect(rating1).toBeChecked();

    await userEvent.click(rating2);
    expect(rating2).toBeChecked();
  });
});
