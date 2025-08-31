package com.example.ecomtest.service.impl;

import com.example.ecomtest.dto.request.auth.AuthenticationRequest;
import com.example.ecomtest.dto.request.auth.RegisterRequest;
import com.example.ecomtest.dto.response.AuthenticationResponse;
import com.example.ecomtest.entity.User;
import com.example.ecomtest.mapper.UserMapper;
import com.example.ecomtest.repository.UserRepository;
import com.example.ecomtest.service.AuthenticationService;
import com.example.ecomtest.service.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalStateException("Email address is already taken.");
        }
        User user = UserMapper.toRegisterRequest(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
        .token(jwtToken)
        .user(UserMapper.toUserResponseDto(user))
        .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().toLowerCase().trim(),
                        request.getPassword()));

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found after successful authentication."));

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).user(UserMapper.toUserResponseDto(user)).build();
    }
}