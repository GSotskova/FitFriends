import { PaymentOption } from "./payment-option.enum";

export interface Order {
  orderId?: number;
  orderType: string;
  trainingId: number;
  price: number;
  trainingCount: number;
  totalPrice: number;
  paymentOption: PaymentOption;
}
