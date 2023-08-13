import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AppRoute, AuthorizationStatus} from '../../constants';
import NotAuthRoute from './not-auth-route';
import { UserRole } from '../../types/user';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: NotAuthRouter', () => {
  beforeEach(() => {
    history.push('/public');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.AccountCoach}
              element={<h1>Private Route</h1>}
            />
            <Route
              path='/public'
              element={
                <NotAuthRoute
                  restrictedFor={AuthorizationStatus.NoAuth}
                  userRole={UserRole.Coach}
                >
                  <h1>Public Route</h1>
                </NotAuthRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.AccountCoach}
              element={<h1>Private Route</h1>}
            />
            <Route
              path='/public'
              element={
                <NotAuthRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  userRole={UserRole.Coach}
                >
                  <h1>Public Route</h1>
                </NotAuthRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
