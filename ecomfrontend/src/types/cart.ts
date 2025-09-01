export interface AddToCartPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderRequest {
  orderItems: {
    productId: string;
    quantity: number;
  }[];
  orderNotes?: string;
}