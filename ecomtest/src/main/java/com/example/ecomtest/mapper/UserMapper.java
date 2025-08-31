package com.example.ecomtest.mapper;

import org.springframework.stereotype.Component;

import com.example.ecomtest.dto.request.auth.RegisterRequest;
import com.example.ecomtest.dto.response.UserResponse;
import com.example.ecomtest.entity.User;
import com.example.ecomtest.entity.enums.Gender;

@Component
public class UserMapper {

    public static UserResponse toUserResponseDto(User user) {
        if (user == null) return null;

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .address(user.getAddress())
                .dateOfBirth(user.getDateOfBirth())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }


    public static User toRegisterRequest(RegisterRequest request) {
        if (request == null) return null;

        return User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .gender(request.getGender() != null ? request.getGender() : Gender.OTHER)
                .address(request.getAddress())
                .dateOfBirth(request.getDateOfBirth())
                .build();
    }

}
