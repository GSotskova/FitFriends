import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import FriendsListUserPage from './friends-list-user';
import { makeFakeUserFullInfo, makeFakeFriend, makeFakeNotify} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, FormRegistration } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeUserFull = Array.from({length: 5}, () => makeFakeUserFullInfo());
const fakeFriends = Array.from({length: 5}, () => makeFakeFriend());
const fakeNotifys = Array.from({length: 5}, () => makeFakeNotify());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUserFull[1], hasErrorLogin: false,
    userData: null, userFullInfo: fakeUserFull, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
    hasErrorPostCertificate: false, users: fakeUserFull, userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_FRIENDS: {friends: fakeFriends, countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false},
  DATA_NOTIFY: {notifications: fakeNotifys, hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false}
});

const history = createMemoryHistory();
jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: FriendsListUserPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FriendsListUserPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

});
