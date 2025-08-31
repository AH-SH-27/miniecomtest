package com.example.ecomtest.service;

import com.example.ecomtest.dto.request.auth.AuthenticationRequest;
import com.example.ecomtest.dto.request.auth.RegisterRequest;
import com.example.ecomtest.dto.response.AuthenticationResponse;

public interface AuthenticationService {

    
    AuthenticationResponse register(RegisterRequest request);


    AuthenticationResponse authenticate(AuthenticationRequest request);
}
