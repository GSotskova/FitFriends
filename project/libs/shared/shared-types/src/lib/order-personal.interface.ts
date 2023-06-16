import { StatusOrder } from "./status-order.enum";

export interface OrderPersonal {
  orderPersonalId?: number;
  initiatorId: string;
  userId: string;
  statusOrder: StatusOrder;
}
