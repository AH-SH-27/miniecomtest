"use client";

import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AdminOrdersResponse, AdminOrderResponse } from "@/types/order";
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
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ChevronDown, ChevronRight } from "lucide-react";
import { AdminRoute } from "@/components/auth/AdminRoute";

const fetchAdminOrders = async (
  page: number,
  size: number = 20
): Promise<AdminOrdersResponse> => {
  const response = await api.get(`/admin/orders?page=${page}&size=${size}`);
  return response.data;
};

function AdminOrdersContact() {
  const [page, setPage] = useState(0);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const size = 20;

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-orders", page, size],
    queryFn: () => fetchAdminOrders(page, size),
  });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (isLoading)
    return <div className="text-center p-8">Loading orders...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error loading orders</div>
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
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({data?.totalElements || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.content.map((order: AdminOrderResponse) => (
                <Fragment key={order.id}>
                  <TableRow className="cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <Collapsible>
                        <CollapsibleTrigger
                          onClick={() => toggleOrderExpansion(order.id)}
                          className="flex items-center"
                        >
                          {expandedOrders.has(order.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                      </Collapsible>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.userFullName}</div>
                        <div className="text-sm text-gray-500">
                          {order.userEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.totalItems} items</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {order.orderNotes || "-"}
                    </TableCell>
                  </TableRow>

                  {expandedOrders.has(order.id) && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-gray-50">
                        <div className="p-4">
                          <h4 className="font-semibold mb-3">Order Items</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead>Stock Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.orderItems.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell className="font-medium">
                                    {item.productName}
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>
                                    ${item.unitPrice.toFixed(2)}
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    ${item.subtotal.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    {getStockStatusBadge(
                                      item.currentStockStatus
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          {order.orderNotes && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-md">
                              <p className="text-sm">
                                <strong>Notes:</strong> {order.orderNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
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
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <AdminRoute>
      <AdminOrdersContact />
    </AdminRoute>
  );
}
