package com.example.ecomtest.mapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.example.ecomtest.dto.request.order.CreateOrderItemRequest;
import com.example.ecomtest.dto.request.order.CreateOrderRequest;
import com.example.ecomtest.dto.response.OrderItemResponse;
import com.example.ecomtest.dto.response.OrderResponse;
import com.example.ecomtest.entity.Order;
import com.example.ecomtest.entity.OrderItem;
import com.example.ecomtest.entity.Product;
import com.example.ecomtest.entity.User;

public class OrderMapper {

    public static Order toOrder(CreateOrderRequest request, User user) {
        if (request == null) {
            return null;
        }

        return Order.builder()
                .user(user)
                .orderItems(new ArrayList<>())
                .totalAmount(BigDecimal.ZERO)
                .orderNotes(request.getOrderNotes())
                .build();
    }

    public static OrderResponse toOrderResponse(Order order) {
        if (order == null) {
            return null;
        }

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .userFullName(order.getUser().getFullName())
                .orderItems(order.getOrderItems().stream()
                        .map(OrderMapper::toOrderItemResponse)
                        .collect(Collectors.toList()))
                .totalAmount(order.getTotalAmount())
                .orderNotes(order.getOrderNotes())
                .createdAt(order.getCreatedAt())
                .build();
    }

    public static OrderItem toOrderItem(CreateOrderItemRequest orderItem, Product product) {
        if (orderItem == null || product == null) {
            return null;
        }

        return OrderItem.builder()
                .product(product)
                .quantity(orderItem.getQuantity())
                .unitPrice(product.getPrice())
                .build();
    }

    public static OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }

        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProduct().getName())
                .quantity(orderItem.getQuantity())
                .unitPrice(orderItem.getUnitPrice())
                .subtotal(orderItem.getSubtotal())
                .currentStockStatus(orderItem.getProduct().getStockStatus())
                .build();
    }

}
