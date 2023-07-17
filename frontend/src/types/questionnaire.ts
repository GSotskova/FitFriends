export type QuestionnaireCoach = {
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificate?: string;
  successCoach: string;
  isPersonal: boolean;
}

export type QuestionnaireUser = {
  userId: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  trainingTime: TrainingTime;
  caloriesReset: number;
  caloriesSpend: number;
  isReady: boolean;
}

export enum TrainingTime {
  Time30 = '10-30 мин',
  Time50 = '30-50 мин',
  Time80 = '50-80 мин',
  Time100 = '80-100 мин'
}

export enum TrainingType {
  Yoga = 'йога',
  Running = 'бег',
  Boxing = 'бокс',
  Stretching = 'стрейчинг',
  Crossfit = 'кроссфит',
  Aerobics = 'аэробика',
  Pilates = 'пилатес',
}
export const TRAINING_ARR = Object.values(TrainingType);


export enum LevelTraining {
  Beginner = 'новичок',
  Amateur = 'любитель',
  Professional = 'профессионал',
}

export const LEVEL_TRAIN_ARR = Object.values(LevelTraining);
