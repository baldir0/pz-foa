export interface ProductOrderInterface {
  id: string;
  orderId: string;
  productId: string;
  amount: number;
}

export type AddProductToOrderInterface = Omit<
  ProductOrderInterface,
  'id' | 'orderId' | 'price'
>;
