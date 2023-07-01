import { PaymentOption } from "./payment-option.enum";

export interface Order {
  _id?: string;
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
}
