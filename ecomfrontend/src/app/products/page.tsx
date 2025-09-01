"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

// STORE
import { useAppDispatch } from "@/lib/hooks";
import { addItem } from "@/lib/features/cart/cartSlice";

// TYPES
import { Product, ProductsResponse } from "@/types/product";
import { AddToCartPayload } from "@/types/cart";

// UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const fetchProducts = async (
  page: number,
  size: number = 10
): Promise<ProductsResponse> => {
  const response = await api.get(`/products?page=${page}&size=${size}`);
  return response.data;
};

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const size = 10;
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, size],
    queryFn: () => fetchProducts(page, size),
  });

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const setQuantity = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Math.min(quantity, 99)),
    }));
  };

  const handleAddToCart = async (product: Product) => {
    const quantity = getQuantity(product.id);

    if (quantity > product.stock) {
      toast("Invalid Quantity");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [product.id]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const payload: AddToCartPayload = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };

      dispatch(addItem(payload));

      toast(`${quantity} × ${product.name} added to your cart`);
    } catch {
      toast("Failed to add item to cart");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  if (isLoading)
    return <div className="text-center p-8">Loading products...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error loading products</div>
    );

  const totalPages = data?.totalPages || 1;
  const currentPage = (data?.number || 0) + 1;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data?.content.map((product: Product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                {product.stockStatus === "OUT_OF_STOCK" && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
                {product.stockStatus === "LOW_STOCK" && (
                  <Badge variant="secondary">Low Stock</Badge>
                )}
              </div>
            </CardHeader>
            {Boolean(product.isActive) ? (
              <CardContent>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
                {product.stock > 0 && (
                  <div className="mb-4">
                    <Label
                      htmlFor={`quantity-${product.id}`}
                      className="text-sm font-medium"
                    >
                      Quantity
                    </Label>

                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setQuantity(product.id, getQuantity(product.id) - 1)
                        }
                        disabled={getQuantity(product.id) <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id={`quantity-${product.id}`}
                        type="number"
                        min="1"
                        max={Math.min(product.stock, 99)}
                        value={getQuantity(product.id)}
                        onChange={(e) =>
                          setQuantity(product.id, parseInt(e.target.value) || 1)
                        }
                        className="w-20 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setQuantity(product.id, getQuantity(product.id) + 1)
                        }
                        disabled={getQuantity(product.id) >= product.stock}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={product.stock === 0 || loadingStates[product.id]}
                  onClick={() => handleAddToCart(product)}
                >
                  {loadingStates[product.id] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : product.stock === 0 ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </CardContent>
            ) : (
              <p className="text-amber-600 text-sm text-center font-medium mt-1">
                Temporarily unavailable
              </p>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setPage(page - 1);
                }}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNum - 1);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setPage(page + 1);
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {data?.numberOfElements || 0} of {data?.totalElements || 0}{" "}
        products
      </div>
    </div>
  );
}
