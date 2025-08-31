package com.example.ecomtest.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.ecomtest.dto.request.product.CreateProductRequest;
import com.example.ecomtest.dto.response.ProductResponse;
import com.example.ecomtest.entity.Product;
import com.example.ecomtest.mapper.ProductMapper;
import com.example.ecomtest.repository.ProductRepository;
import com.example.ecomtest.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private static final int LOW_STOCK_THRESHOLD = 5;

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(ProductMapper::toProductResponse);
    }

    @Override
    public ProductResponse createProduct(CreateProductRequest request) {
        Product product = ProductMapper.toProduct(request);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toProductResponse(savedProduct);
    }

    @Override
    public Page<ProductResponse> fetchLowStockProducts(Pageable pageable) {
        return productRepository.findByStockLessThanAndIsActiveTrueOrderByStockAsc(LOW_STOCK_THRESHOLD, pageable)
            .map(ProductMapper::toProductResponse);
    }

}
