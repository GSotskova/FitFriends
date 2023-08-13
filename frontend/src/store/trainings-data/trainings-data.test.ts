import {trainingsData} from './trainings-data';
import {TrainingData} from '../../types/state';
import {fetchCoachTrainings, postTraining, fetchCoachTraining, fetchUserTrainings, fetchCoachOtherTrainings, fetchCountTrainings} from '../api-actions-trainings';
import {makeFakeTraining} from '../../utils/mocks';

describe('Reducer: trainings', () => {
  let state: TrainingData;

  beforeEach(() => {
    state = {
      trainings: [],
      countAllTrainings: {
        totalTrainings: 0,
        maxPrice: 0},
      isLoadingCountAllTrainings: false,
      userTrainings: [],
      coachTrainings: [],
      isTrainingsDataLoading: false,
      isCoachTrainingsLoading: false,
      hasError: false,
      isTrainingLoading: false,
      training: null,
      hasErrorPost: false,
      isLoadingPostTraining: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(trainingsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
        isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
        isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
        hasError: false, isTrainingLoading: false, training: null,
        hasErrorPost: false, isLoadingPostTraining: false});
  });

  describe('fetchCoachTrainings test', () => {
    it('fetchCoachTrainings fulfilled test', () => {
      const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
      expect(trainingsData.reducer(state, { type: fetchCoachTrainings.fulfilled, payload: fakeTrainings}))
        .toEqual({trainings: fakeTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCoachTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCoachTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });


  describe('fetchCountTrainings test', () => {
    it('fetchCountTrainings fulfilled test', () => {
      const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
      const prices = fakeTrainings.map((el) => el.price ? el.price : 0);
      const maxPrice = prices.reduce((prev, current) => (prev > current) ? prev : current);
      expect(trainingsData.reducer(state, { type: fetchCountTrainings.fulfilled, payload: {totalTrainings: fakeTrainings.length, maxPrice: maxPrice}}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: fakeTrainings.length, maxPrice: maxPrice},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCountTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCountTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });

  describe('fetchUserTrainings test', () => {
    it('fetchUserTrainings fulfilled test', () => {
      const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
      expect(trainingsData.reducer(state, { type: fetchUserTrainings.fulfilled, payload: fakeTrainings}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: fakeTrainings, coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchUserTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchUserTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });


  describe('fetchCoachTraining test', () => {
    it('fetchCoachTraining fulfilled test', () => {
      const fakeTraining = makeFakeTraining();
      expect(trainingsData.reducer(state, { type: fetchCoachTraining.fulfilled, payload: fakeTraining}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: fakeTraining,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCoachTraining rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCoachTraining.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });

  describe('postTraining test', () => {
    it('postTraining fulfilled test', () => {
      const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
      const fakeTraining = makeFakeTraining();
      const updTrainings = [...fakeTrainings, fakeTraining];
      expect(trainingsData.reducer({...state, trainings: fakeTrainings}, { type: postTraining.fulfilled, payload: fakeTraining}))
        .toEqual({trainings: updTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('postTraining rejected test', () => {
      expect(trainingsData.reducer(state, { type: postTraining.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: true, isLoadingPostTraining: false});
    });
  });


  describe('fetchCoachOtherTrainings test', () => {
    it('fetchCoachOtherTrainings fulfilled test', () => {
      const fakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
      expect(trainingsData.reducer(state, { type: fetchCoachOtherTrainings.fulfilled, payload: fakeTrainings}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: fakeTrainings,
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCoachOtherTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCoachOtherTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });
});
