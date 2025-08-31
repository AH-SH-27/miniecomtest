package com.example.ecomtest.mapper;

import org.springframework.stereotype.Component;

import com.example.ecomtest.dto.request.product.CreateProductRequest;
import com.example.ecomtest.dto.response.ProductResponse;
import com.example.ecomtest.entity.Product;

@Component
public class ProductMapper {
    
    public static Product toProduct(CreateProductRequest request) {
        if (request == null) {
            return null;
        }
        
        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock() != null ? request.getStock() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
    }
    
    public static ProductResponse toProductResponse(Product product) {
        if (product == null) {
            return null;
        }
        
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .isActive(product.getIsActive())
                .stockStatus(product.getStockStatus())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
    
    // public static void updateProductFromRequest(Product product, UpdateProductRequest request) {
    //     if (product == null || request == null) {
    //         return;
    //     }
        
    //     if (request.getName() != null) {
    //         product.setName(request.getName());
    //     }
    //     if (request.getDescription() != null) {
    //         product.setDescription(request.getDescription());
    //     }
    //     if (request.getPrice() != null) {
    //         product.setPrice(request.getPrice());
    //     }
    //     if (request.getStock() != null) {
    //         product.setStock(request.getStock());
    //     }
    //     if (request.getIsActive() != null) {
    //         product.setIsActive(request.getIsActive());
    //     }
    // }
}