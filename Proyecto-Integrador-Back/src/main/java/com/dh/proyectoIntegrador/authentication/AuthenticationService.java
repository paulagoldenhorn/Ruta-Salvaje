package com.dh.proyectoIntegrador.authentication;

import com.dh.proyectoIntegrador.entity.User;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.UserRepository;
import com.dh.proyectoIntegrador.security.JwtService;
import com.dh.proyectoIntegrador.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
// Service for registering and authenticating users
public class AuthenticationService {
    private final UserService userService;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws BadRequestException {
        var user = userService.createUser(request);

        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("user_id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws ResourceNotFoundException {
        // Authenticates user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userService.getUserByEmail(request.getEmail());

        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("user_id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
