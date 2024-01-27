import { OrderPositionDataDTO } from '../rotuers/order/dto/orderPositionData.dto';

export interface OrderInterface {
  id: string;
  userId: string;
  createdAt: string;
  changedAt: string;
}

export interface OrderDataInterface {
  userId: string;
  firstName: string;
  lastName: string;
  address: string;
}

export interface NewOrderDataInterface {
  address: string;
  firstName: string;
  lastName: string;
  products: OrderPositionDataDTO[];
}
