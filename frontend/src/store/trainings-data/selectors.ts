import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Training, TotalTrainInfo} from '../../types/training';


export const getTrainings = (state: State): Training[] => state[NameSpace.DataTrainings].trainings;
export const getUserTrainings = (state: State): Training[] => state[NameSpace.DataTrainings].userTrainings;
export const getCoachTrainings = (state: State): Training[] => state[NameSpace.DataTrainings].coachTrainings;
export const getTraining = (state: State): Training | null => state[NameSpace.DataTrainings].training;
export const getTrainingsDataLoadingStatus = (state: State): boolean => state[NameSpace.DataTrainings].isTrainingsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.DataTrainings].hasError;
export const getErrorPost = (state: State): boolean => state[NameSpace.DataTrainings].hasErrorPost;
export const getIsTrainingLoading = (state: State): boolean => state[NameSpace.DataTrainings].isTrainingLoading;
export const getIsCoachTrainingsLoading = (state: State): boolean => state[NameSpace.DataTrainings].isCoachTrainingsLoading;
export const getCountAllTrainings = (state: State): TotalTrainInfo => state[NameSpace.DataTrainings].countAllTrainings;
export const getIsLoadingCountAllTrainings = (state: State): boolean => state[NameSpace.DataTrainings].isLoadingCountAllTrainings;
export const getIsLoadingPostTraining = (state: State): boolean => state[NameSpace.DataTrainings].isLoadingPostTraining;
