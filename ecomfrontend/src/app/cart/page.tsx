"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  removeItem,
  clearCart,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateOrderRequest } from "@/types/cart";
import { useSelector } from "react-redux";
import {
  selectAuth,
  selectIsAuthenticated,
} from "@/lib/features/auth/authSlice";
import { toast } from "sonner";

const createOrder = async (orderData: CreateOrderRequest) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export default function CartPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { user } = useAppSelector(selectAuth);
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [orderNotes, setOrderNotes] = useState("");

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      dispatch(clearCart());
      toast("Order placed successfully!");
    },
    onError: () => {
      toast("Failed to place order");
    },
  });

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast("Please login before placing an order");
      return;
    }
    if (user?.role !== "USER") {
      toast("Only users can make orders");
      return;
    }
    if (items.length === 0) return;

    const orderData: CreateOrderRequest = {
      orderItems: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      orderNotes: orderNotes || undefined,
    };

    orderMutation.mutate(orderData);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Button
            onClick={() => (window.location.href = "/products")}
            className="mt-4"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>

                    <div className="text-lg font-semibold min-w-[80px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total: ${total.toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Order Notes (Optional)
                </label>
                <Input
                  placeholder="Any special instructions..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  maxLength={500}
                />
              </div>

              <div className="space-y-2">
                {user?.role === "USER" && (
                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full"
                    disabled={orderMutation.isPending}
                  >
                    {orderMutation.isPending
                      ? "Placing Order..."
                      : "Place Order"}
                  </Button>
                )}

                <Button
                  onClick={() => dispatch(clearCart())}
                  variant="outline"
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
