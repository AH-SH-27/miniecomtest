package com.example.ecomtest.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.ecomtest.dto.request.order.CreateOrderRequest;
import com.example.ecomtest.dto.response.OrderResponse;
import com.example.ecomtest.entity.User;

public interface OrderService {

    OrderResponse createOrder(CreateOrderRequest request, User user);

    // FOR ADMIN
    Page<OrderResponse> getAllOrders(Pageable pageable);
}

