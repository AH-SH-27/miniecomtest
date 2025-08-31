package com.example.ecomtest.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.ecomtest.dto.request.product.CreateProductRequest;
import com.example.ecomtest.dto.response.ProductResponse;


public interface ProductService {

    Page<ProductResponse> getAllProducts(Pageable pageable);
    
    ProductResponse createProduct(CreateProductRequest request);

    Page<ProductResponse> fetchLowStockProducts(Pageable pageable);

}
