package com.example.ecomtest.dto.response;

import java.math.BigDecimal;
import java.util.UUID;

import com.example.ecomtest.entity.enums.StockStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    
    private UUID id;
    private UUID productId;
    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
    private StockStatus currentStockStatus;
}
