import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CommentItem from './comment-item';
import { makeFakeComment} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeComment = makeFakeComment();


const store = mockStore({
  DATA_COMMENT: {comments: [fakeComment], isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false}
});


describe('Component: CommentItem', () => {
  it('should render "CommentItem"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CommentItem
              comment={fakeComment}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeComment.message)).toBeInTheDocument();

  });
});
