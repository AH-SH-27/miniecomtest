package com.example.ecomtest.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecomtest.dto.response.OrderResponse;
import com.example.ecomtest.dto.response.ProductResponse;
import com.example.ecomtest.service.OrderService;
import com.example.ecomtest.service.ProductService;

import lombok.RequiredArgsConstructor;


@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final OrderService orderService;
    private final ProductService productService;

    
    @GetMapping("orders")
    public ResponseEntity<Page<OrderResponse>> getOrders(Pageable pageable) {
        Page<OrderResponse> order = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<Page<ProductResponse>> getLowStockProducts(Pageable pageable) {
        Page<ProductResponse> lowStockProducts = productService.fetchLowStockProducts(pageable);
        return ResponseEntity.ok(lowStockProducts);
    }
}
