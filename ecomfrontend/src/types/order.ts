export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  orderItems: CreateOrderItem[];
  orderNotes?: string;
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  currentStockStatus: 'OUT_OF_STOCK' | 'LOW_STOCK' | 'IN_STOCK';
}

export interface AdminOrderResponse {
  id: string;
  userId: string;
  userEmail: string;
  userFullName: string;
  orderItems: OrderItemResponse[];
  totalAmount: number;
  orderNotes?: string;
  createdAt: string;
  totalItems: number;
}

export interface AdminOrdersResponse {
  content: AdminOrderResponse[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}