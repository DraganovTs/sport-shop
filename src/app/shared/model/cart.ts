import { createId } from "@paralleldrive/cuid2";

export interface ICart {
  id: string;
  items: IcartItem[];
  shippingPrice: number;
}

export interface IcartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  brandName: string;
  categoryName: string;
}

export class Cart implements ICart {
  id = createId();
  items: IcartItem[] = [];
  shippingPrice = 0;
}

export interface IcartTotals {
  subtotal: number;
  shipping: number;
  total: number;
}
