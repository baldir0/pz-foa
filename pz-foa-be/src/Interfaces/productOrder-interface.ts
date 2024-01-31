export interface ProductOrderInterface {
  id: string;
  orderId: string;
  productId: string;
  amount: number;
  price: number;
}

export type AddProductToOrderInterface = Omit<
  ProductOrderInterface,
  'id' | 'orderId'
>;
