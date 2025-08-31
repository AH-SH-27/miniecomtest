package com.example.ecomtest.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    
    private UUID id;
    private UUID userId;
    private String userEmail;
    private String userFullName;
    private List<OrderItemResponse> orderItems;
    private BigDecimal totalAmount;
    private String orderNotes;
    private LocalDateTime createdAt;
    private Integer totalItems;
}