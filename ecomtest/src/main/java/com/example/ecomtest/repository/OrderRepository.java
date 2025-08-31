package com.example.ecomtest.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecomtest.entity.Order;

public interface OrderRepository extends JpaRepository<Order, UUID>  {
    
}
