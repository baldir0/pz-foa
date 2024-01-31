export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  avalaibleStocks: number;
  imgSrc: string;
  createdAt: string;
  changedAt: string;
  createdBy: string;
}

export type NewProductInterface = Omit<
  ProductInterface,
  'changedAt' | 'createdAt' | 'createdBy' | 'id'
>;

export interface UpdateProductInterface {
  name?: string;
  description?: string;
  price?: number;
  avalaibleStocks?: number;
  imgSrc?: string;
}
