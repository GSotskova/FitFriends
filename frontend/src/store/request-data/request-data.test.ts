import {requestData} from './request-data';
import {RequestData} from '../../types/state';
import {acceptRequest, deleteRequest, createRequest} from '../api-actions-request';

describe('Reducer: request', () => {
  let state: RequestData;

  beforeEach(() => {
    state = {
      hasErrorPost: false,
      hasErrorDelete: false,
      isLoadPost: false,
      isLoadDelete: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(requestData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({hasErrorPost: false, hasErrorDelete: false,
        isLoadPost: false, isLoadDelete: false});
  });

  describe('acceptRequest test', () => {
    it('acceptRequest fulfilled test', () => {
      expect(requestData.reducer(state, { type: acceptRequest.fulfilled.type}))
        .toEqual({hasErrorPost: false, hasErrorDelete: false,
          isLoadPost: false, isLoadDelete: false});
    });
    it('acceptRequest rejected test', () => {
      expect(requestData.reducer(state, { type: acceptRequest.rejected.type }))
        .toEqual({hasErrorPost: true, hasErrorDelete: false,
          isLoadPost: false, isLoadDelete: false});
    });
  });

  describe('deleteRequest test', () => {
    it('deleteRequest fulfilled test', () => {
      expect(requestData.reducer(state , {type: deleteRequest.fulfilled.type}))
        .toEqual({hasErrorPost: false, hasErrorDelete: false,
          isLoadPost: false, isLoadDelete: false});
    });
    it('deleteRequest rejected test', () => {
      expect(requestData.reducer(state, { type: deleteRequest.rejected.type }))
        .toEqual({hasErrorPost: false, hasErrorDelete: true,
          isLoadPost: false, isLoadDelete: false});
    });
  });

  describe('createRequest test', () => {
    it('createRequest fulfilled test', () => {
      expect(requestData.reducer(state , {type: createRequest.fulfilled}))
        .toEqual({hasErrorPost: false, hasErrorDelete: false,
          isLoadPost: false, isLoadDelete: false});
    });
    it('createRequest rejected test', () => {
      expect(requestData.reducer(state, { type: createRequest.rejected.type }))
        .toEqual({hasErrorPost: true, hasErrorDelete: false,
          isLoadPost: false, isLoadDelete: false});
    });
  });
});
