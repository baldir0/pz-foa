export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  avalaibleStocks: number;
  createdAt: string;
  changedAt: string;
  createdBy: string;
}

export type NewProductInterface = Omit<
  ProductInterface,
  'changedAt' | 'createdAt' | 'createdBy' | 'id'
>;
