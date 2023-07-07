import { Order, PaymentOption } from '@project/shared/shared-types';

export class TrainingOrdersEntity implements Order {
  public _id: string;
  public userId: string;
  public coachId: string;
  public orderType: string;
  public trainingId: string;
  public trainingCount: number;
  public totalPrice: number;
  public price: number;
  public paymentOption: PaymentOption;
  public trainingDoneCount: number;
  public trainingRestCount: number;
  public isDone: boolean;

  constructor(ordersEntity: Order) {
    this.fillEntity(ordersEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(ordersEntity: Order) {
    this._id = ordersEntity._id;
    this.userId = ordersEntity.userId;
    this.coachId = ordersEntity.coachId;
    this.orderType = ordersEntity.orderType;
    this.trainingId = ordersEntity.trainingId;
    this.trainingCount = ordersEntity.trainingCount;
    this.totalPrice = ordersEntity.totalPrice;
    this.price = ordersEntity.price;
    this.paymentOption = ordersEntity.paymentOption;
    this.trainingDoneCount = ordersEntity.trainingDoneCount;
    this.trainingRestCount = ordersEntity.trainingRestCount;
    this.isDone = ordersEntity.isDone;
  }
}
