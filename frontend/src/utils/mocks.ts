import {lorem, datatype, name, internet, image, random} from 'faker';
import { UserFullInfo, UserRole, UserSex, User, Friend, StatusRequest, UserGeneral } from '../types/user';
import { Comment, Training } from '../types/training';
import { LevelTraining, TrainingTime, TrainingType } from '../types/questionnaire';
import { StationMetro } from '../types/station-metro';
import { Notify, NotifyMessage } from '../types/notify';
import { Order, PaymentOption } from '../types/order';


export const makeFakeUser = (): User => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole))
} as User);

export const makeFakeUserGeneral = (): UserGeneral => ({
  userName: name.firstName(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole)),
  sex: random.arrayElement(Object.values(UserSex)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  description: lorem.words(10),
  location:  random.arrayElement(Object.values(StationMetro)),
  password: internet.password()
} as UserGeneral);


export const makeFakeUserFullInfo = (): UserFullInfo => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  sex: random.arrayElement(Object.values(UserSex)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(StationMetro)),
  levelTraining: random.arrayElement(Object.values(LevelTraining)),
  trainingType: random.arrayElements(Object.values(TrainingType), 3),
  certificate: [],
  certificatesPath: [{certificateId: datatype.uuid(), certificatePath: image.avatar()}],
  successCoach: lorem.words(10),
  isPersonal: datatype.boolean(),
  trainingTime: random.arrayElement(Object.values(TrainingTime)),
  caloriesReset: datatype.number({ min: 1000, max: 5000}),
  caloriesSpend: datatype.number({ min: 1000, max: 5000}),
  isReady: datatype.boolean(),
  isFriend: datatype.boolean(),
  isSubscribe: datatype.boolean(),

} as UserFullInfo);


export const makeFakeComment = (): Comment => ({
  message: lorem.words(55),
  trainingId: datatype.uuid(),
  id: datatype.uuid(),
  ratingTraining: datatype.number({ min: 1, max: 5}),
  userId: datatype.uuid(),
  userName: name.firstName(),
  avatarPath: image.avatar(),
} as Comment);

export const makeFakeTraining = (): Training => ({
  id: datatype.uuid(),
  nameTraining: name.title(),
  photoTraning: datatype.uuid(),
  levelTraining: random.arrayElement(Object.values(LevelTraining)),
  trainingType: random.arrayElement(Object.values(TrainingType)),
  trainingTime: random.arrayElement(Object.values(TrainingTime)),
  price: datatype.number(),
  caloriesReset: datatype.number({ min: 1000, max: 5000}),
  descriptionTraining: lorem.words(50),
  sex:random.arrayElement(Object.values(UserSex)),
  videoTraning: datatype.uuid(),
  videoTraningPath:  image.avatar(),
  rating: datatype.number({ min: 1, max: 5}),
  coachId: datatype.uuid(),
  coachName: name.title(),
  coachAvataPath:  image.avatar(),
  isSpecialOffer: datatype.boolean(),
  createdAt: datatype.datetime()
} as Training);

export const makeFakeFriend = (): Friend => ({
  id: datatype.uuid(),
  userId: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  sex: random.arrayElement(Object.values(UserSex)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(StationMetro)),
  trainingType: random.arrayElements(Object.values(TrainingType), 3),
  requestPersonal: datatype.boolean(),
  requestTogether: datatype.boolean(),
  requestStatus: random.arrayElement(Object.values(StatusRequest)),
  requestId: datatype.uuid(),
  isReady: datatype.boolean(),

} as Friend);

export const makeFakeNotify = (): Notify => ({
  id: datatype.uuid(),
  userId: datatype.uuid(),
  initiatorId: datatype.uuid(),
  initiatorName: datatype.uuid(),
  text: random.arrayElement(Object.values(NotifyMessage)),
  dateNotify: datatype.datetime()

} as Notify);


export const makeFakeOrder = (): Order =>{
  const price = datatype.number();
  const count = datatype.number();
  const trainingRestCount = datatype.number({min: 0, max: count});
  return ({
    id: datatype.uuid(),
    userId: datatype.uuid(),
    coachId: datatype.uuid(),
    trainingId: datatype.uuid(),
    trainingCount: count,
    totalPrice: trainingRestCount * price,
    nameTraining: name.title(),
    price: price,
    paymentOption: random.arrayElement(Object.values(PaymentOption)),
    trainingDoneCount: count - trainingRestCount,
    trainingRestCount: trainingRestCount,
    isDone: trainingRestCount === 0,
    levelTraining: random.arrayElement(Object.values(LevelTraining)),
    trainingType: random.arrayElement(Object.values(TrainingType)),
    trainingTime: random.arrayElement(Object.values(TrainingTime)),
    caloriesReset: datatype.number({ min: 1000, max: 5000}),
    descriptionTraining: lorem.words(50),
    sex: random.arrayElement(Object.values(UserSex)),
    isSpecialOffer: datatype.boolean(),
    rating: datatype.number({ min: 1, max: 5}),
  } as Order);
};

export const makeFakeUserCoach = (): UserFullInfo => ({
  id: datatype.uuid(),
  userName: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  sex: random.arrayElement(Object.values(UserSex)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: 'coach',
  description: lorem.words(10),
  location: random.arrayElement(Object.values(StationMetro)),
  levelTraining: random.arrayElement(Object.values(LevelTraining)),
  trainingType: random.arrayElements(Object.values(TrainingType), 3),
  certificate: [],
  certificatesPath: [{certificateId: datatype.uuid(), certificatePath: image.avatar()}],
  successCoach: lorem.words(10),
  isPersonal: datatype.boolean(),
  trainingTime: random.arrayElement(Object.values(TrainingTime)),
  caloriesReset: datatype.number({ min: 1000, max: 5000}),
  caloriesSpend: 0,
  isReady: false,
  isFriend: datatype.boolean(),
  isSubscribe: datatype.boolean(),

} as UserFullInfo);
