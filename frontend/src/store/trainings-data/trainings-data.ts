import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {TrainingData} from '../../types/state';
import {editTraining, fetchCoachTrainings, postTraining, fetchCoachTraining, fetchUserTrainings, fetchCatalogTrainings, fetchCoachOtherTrainings, fetchCountTrainings} from '../api-actions';

const initialState: TrainingData = {
  trainings: [],
  countAllTrainings: 0,
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


export const trainingsData = createSlice({
  name: NameSpace.DataTrainings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoachTrainings.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCoachTrainings.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.isTrainingsDataLoading = false;
      })
      .addCase(fetchCoachTrainings.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCountTrainings.pending, (state) => {
        state.isLoadingCountAllTrainings = true;
        state.hasError = false;
      })
      .addCase(fetchCountTrainings.fulfilled, (state, action) => {
        state.countAllTrainings = action.payload;
        state.isLoadingCountAllTrainings = false;
      })
      .addCase(fetchCountTrainings.rejected, (state) => {
        state.isLoadingCountAllTrainings = false;
        state.hasError = true;
      })
      .addCase(fetchUserTrainings.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUserTrainings.fulfilled, (state, action) => {
        state.userTrainings = action.payload;
        state.isTrainingsDataLoading = false;
      })
      .addCase(fetchUserTrainings.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCatalogTrainings.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCatalogTrainings.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.isTrainingsDataLoading = false;
      })
      .addCase(fetchCatalogTrainings.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCoachTraining.pending, (state) => {
        state.isTrainingLoading = true;
      })
      .addCase(fetchCoachTraining.fulfilled, (state, action) => {
        state.training = action.payload;
        state.isTrainingLoading = false;
      })
      .addCase(fetchCoachTraining.rejected, (state) => {
        state.isTrainingLoading = false;
      })
      .addCase(postTraining.pending, (state, action) => {
        state.hasErrorPost = false;
        state.isLoadingPostTraining = true;
      })
      .addCase(postTraining.fulfilled, (state, action) => {
        state.trainings.push(action.payload);
        state.hasErrorPost = false;
        state.isLoadingPostTraining = false;
      })
      .addCase(postTraining.rejected, (state) => {
        state.hasErrorPost = true;
        state.isLoadingPostTraining = false;
      })
      .addCase(editTraining.fulfilled, (state, action) => {
        const updatedTraining = action.payload;
        state.trainings = state.trainings.map((training) => training.id === updatedTraining.id ? updatedTraining : training);
      })
      .addCase(fetchCoachOtherTrainings.pending, (state) => {
        state.isCoachTrainingsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCoachOtherTrainings.fulfilled, (state, action) => {
        state.coachTrainings = action.payload;
        state.isCoachTrainingsLoading = false;
      })
      .addCase(fetchCoachOtherTrainings.rejected, (state) => {
        state.isCoachTrainingsLoading = false;
        state.hasError = true;
      });
  }
});

