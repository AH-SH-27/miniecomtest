package com.example.ecomtest.dto.request.auth;

import com.example.ecomtest.entity.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String fullName;

    private String email;

    private String password;

    private String phoneNumber;

    private Gender gender;

    private String address;

    private LocalDate dateOfBirth;

}
