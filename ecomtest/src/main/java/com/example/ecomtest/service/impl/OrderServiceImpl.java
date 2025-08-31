package com.example.ecomtest.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecomtest.dto.request.order.CreateOrderItemRequest;
import com.example.ecomtest.dto.request.order.CreateOrderRequest;
import com.example.ecomtest.dto.response.OrderResponse;
import com.example.ecomtest.entity.Order;
import com.example.ecomtest.entity.OrderItem;
import com.example.ecomtest.entity.Product;
import com.example.ecomtest.entity.User;
import com.example.ecomtest.mapper.OrderMapper;
import com.example.ecomtest.repository.OrderRepository;
import com.example.ecomtest.repository.ProductRepository;
import com.example.ecomtest.service.OrderService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, User user) {

        Order order = OrderMapper.toOrder(request, user);

        for (CreateOrderItemRequest orderItem : request.getOrderItems()) {
            processOrderItem(order, orderItem);
        }

        if (order.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("No valid items in order");
        }

        order.recalculateTotal();
        Order savedOrder = orderRepository.save(order);
        
        return OrderMapper.toOrderResponse(savedOrder);
    }

    private void processOrderItem(Order order, CreateOrderItemRequest orderItem) {

        Product product = productRepository.findById(orderItem.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + orderItem.getProductId()));

        if (!product.isAvailable()) {
            throw new IllegalArgumentException("Product is not available: " + product.getName());
        }

        if (product.getStock() < orderItem.getQuantity()) {
            throw new IllegalArgumentException(
                String.format("Insufficient stock for product '%s'. Available: %d, Requested: %d",
                    product.getName(), product.getStock(), orderItem.getQuantity()));
        }

        product.reduceStock(orderItem.getQuantity());
        productRepository.save(product);

        OrderItem orderItemToAdd = OrderMapper.toOrderItem(orderItem, product);
        order.addOrderItem(orderItemToAdd);
    }

    // FOR ADMIN
    @Transactional(readOnly = true)
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(OrderMapper::toOrderResponse);
    }

}