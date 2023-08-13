import {render, screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404');

    expect(headerElement).toBeInTheDocument();
  });
});
