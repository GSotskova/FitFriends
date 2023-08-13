import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FriendItem from './friend-item';
import { makeFakeFriend} from '../../utils/mocks';
import { UserRole } from '../../types/user';

const mockStore = configureMockStore();
const fakeFriend = makeFakeFriend();


const store = mockStore({
  DATA_FRIENDS: {friends: [fakeFriend], countFiends: 1, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false}
});


describe('Component: FriendItem', () => {
  it('should render "FriendItem"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FriendItem
              user={fakeFriend}
              currentUserRole={UserRole.Coach}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeFriend.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeFriend.location)).toBeInTheDocument();

  });
});
