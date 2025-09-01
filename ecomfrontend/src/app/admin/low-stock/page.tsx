"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Product } from "@/types/product";
import { AdminRoute } from "@/components/auth/AdminRoute";

const fetchLowStockProducts = async (
  page: number,
  size: number = 20
): Promise<{
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
}> => {
  const response = await api.get(`/admin/low-stock?page=${page}&size=${size}`);
  return response.data;
};

function LowStockProductsContact() {
  const [page, setPage] = useState(0);
  const size = 20;

  const { data, isLoading, error } = useQuery({
    queryKey: ["low-stock-products", page, size],
    queryFn: () => fetchLowStockProducts(page, size),
  });

  if (isLoading)
    return <div className="text-center p-8">Loading products...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Error loading low stock products
      </div>
    );

  const totalPages = data?.totalPages || 1;
  const currentPage = (data?.number || 0) + 1;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "OUT_OF_STOCK":
        return <Badge variant="destructive">Out of Stock</Badge>;
      case "LOW_STOCK":
        return <Badge variant="secondary">Low Stock</Badge>;
      default:
        return <Badge variant="outline">In Stock</Badge>;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Low Stock Products</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Products Low on Stock ({data?.totalElements || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">
                    {product.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {product.description || "-"}
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {getStockStatusBadge(product.stockStatus)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(product.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(product.updatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
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
        </CardContent>
      </Card>
    </div>
  );
}

export default function AddPLowStockProductsPage() {
  return (
    <AdminRoute>
      <LowStockProductsContact />
    </AdminRoute>
  );
}
