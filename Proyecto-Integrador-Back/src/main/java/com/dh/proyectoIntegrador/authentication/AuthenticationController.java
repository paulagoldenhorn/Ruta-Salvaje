package com.dh.proyectoIntegrador.authentication;

import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.service.EmailSenderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @Operation(summary = "Registers a new User")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Email already registered; Invalid password length"),
            @ApiResponse(responseCode = "200", description = "User registered successfully")
    })
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws BadRequestException {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    @Operation(summary = "Authenticates a User")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "403", description = "Forbidden: User not found"),
            @ApiResponse(responseCode = "200", description = "User authenticated successfully")
    })
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws ResourceNotFoundException {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
