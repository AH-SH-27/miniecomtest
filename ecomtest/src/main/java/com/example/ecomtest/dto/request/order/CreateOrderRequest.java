package com.example.ecomtest.dto.request.order;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {
    
    @NotNull(message = "Order items are required")
    @NotEmpty(message = "order items cannot be empty")
    @Valid
    private List<CreateOrderItemRequest> orderItems;
    
    @Size(max = 500, message = "Order notes cannot exceed 500 characters")
    private String orderNotes;
}