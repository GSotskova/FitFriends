import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {TrainingData} from '../../types/state';
import {editTraining, fetchCoachTrainings, postTraining, fetchCoachTraining} from '../api-actions';

const initialState: TrainingData = {
  trainings: [],
  isTrainingsDataLoading: false,
  hasError: false,
  isTrainingLoading: false,
  training: null,
  hasErrorPost: false
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
        console.log('fetchCoachTrainings')
        state.isTrainingsDataLoading = false;
      })
      .addCase(fetchCoachTrainings.rejected, (state) => {
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
      .addCase(postTraining.fulfilled, (state, action) => {
        state.trainings.push(action.payload);
        state.hasErrorPost = false;
      })
      .addCase(postTraining.rejected, (state) => {
        state.hasErrorPost = true;
      })
      .addCase(editTraining.fulfilled, (state, action) => {
        const updatedTraining = action.payload;
        state.trainings = state.trainings.map((training) => training.id === updatedTraining.id ? updatedTraining : training);

      });
  }
});

