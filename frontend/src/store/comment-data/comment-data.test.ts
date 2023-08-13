import {commentsData} from './comment-data';
import {CommentData} from '../../types/state';
import {fetchComments, postComment} from '../api-actions-trainings';
import {makeFakeComment} from '../../utils/mocks';

describe('Reducer: comments', () => {
  let state: CommentData;

  beforeEach(() => {
    state = {
      comments: [],
      isCommentsDataLoading: false,
      hasError: false,
      hasErrorPostComment: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({ comments: [],
        isCommentsDataLoading: false,
        hasError: false,
        hasErrorPostComment: false});
  });

  describe('fetchComments test', () => {
    it('fetchComments fulfilled test', () => {
      const fakeComments = Array.from({length: 5}, () => makeFakeComment());
      expect(commentsData.reducer(state, { type: fetchComments.fulfilled, payload: fakeComments}))
        .toEqual({comments: fakeComments,
          isCommentsDataLoading: false,
          hasError: false,
          hasErrorPostComment: false});
    });
    it('fetchComments rejected test', () => {
      expect(commentsData.reducer(state, { type: fetchComments.rejected.type }))
        .toEqual({comments: [],
          isCommentsDataLoading: false,
          hasError: true,
          hasErrorPostComment: false});
    });
  });


  describe('postComment test', () => {
    it('postComment fulfilled test', () => {
      const fakeComments = Array.from({length: 5}, () => makeFakeComment());
      const fakeComment = makeFakeComment();
      expect(commentsData.reducer({...state, comments: fakeComments} , { type: postComment.fulfilled, payload: fakeComment}))
        .toEqual({comments: [...fakeComments, fakeComment],
          isCommentsDataLoading: false,
          hasError: false,
          hasErrorPostComment: false});
    });
    it('postComment rejected test', () => {
      expect(commentsData.reducer(state, { type: postComment.rejected.type }))
        .toEqual({comments: [],
          isCommentsDataLoading: false,
          hasError: false,
          hasErrorPostComment: true});
    });
  });
});
