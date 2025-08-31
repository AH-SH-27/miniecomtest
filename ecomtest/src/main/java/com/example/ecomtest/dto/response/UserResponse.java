package com.example.ecomtest.dto.response;

import com.example.ecomtest.entity.enums.Gender;
import com.example.ecomtest.entity.enums.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private UUID id;

    private String fullName;

    private String email;

    private String phoneNumber;

    private Gender gender;

    private String address;

    private LocalDate dateOfBirth;

    private Roles role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}