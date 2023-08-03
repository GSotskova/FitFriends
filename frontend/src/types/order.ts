export type Order = {
  id: string;
  userId: string;
  coachId: string;
  orderType: string;
  trainingId: string;
  trainingCount: number;
  totalPrice: number;
  price: number;
  paymentOption: PaymentOption;
  trainingDoneCount: number;
  trainingRestCount: number;
  isDone: boolean;
  nameTraining: string;
  levelTraining: string;
  trainingType: string;
  trainingTime: string;
  caloriesReset: number;
  descriptionTraining: string;
  sex: string;
  isSpecialOffer: boolean;
  rating: number;
}

export enum PaymentOption {
  Visa = 'visa',
  Mir = 'mir',
  Iomoney = 'iomoney',
}
export const PAY_OPTION = Object.values(PaymentOption);

export type NewOrder = {
  trainingId: string;
  trainingCount: number;
  paymentOption: PaymentOption;
}

