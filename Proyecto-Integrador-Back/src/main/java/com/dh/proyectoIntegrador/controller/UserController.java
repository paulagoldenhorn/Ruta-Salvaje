package com.dh.proyectoIntegrador.controller;

import com.dh.proyectoIntegrador.authentication.AuthenticationResponse;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.entity.User;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.security.JwtService;
import com.dh.proyectoIntegrador.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @GetMapping()
    @Operation(summary = "Gets a User by the extracted ID from token", description = "Token must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "User does not exist"),
            @ApiResponse(responseCode = "200", description = "User founded successfully")
    })
    public ResponseEntity<?> getUser() throws ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(userId));
    }

    @GetMapping("/all")
    @Operation(summary = "Gets all Users", description = "Response is pageable: 'page' represents the number of page and 'size' the number of registries to get")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users founded successfully")
    })
    public ResponseEntity<Page<User>> getAllUsers(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers(pageable));
    }

    @DeleteMapping()
    @Operation(summary = "Deletes a User by the extracted ID from token", description = "Token must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "User does not exist"),
            @ApiResponse(responseCode = "200", description = "User deleted successfully")
    })
    public ResponseEntity<?> deleteUser() throws ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping()
    @Operation(summary = "Updates User", description = "ID must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "User does not exist; Email already registered; Invalid password length"),
            @ApiResponse(responseCode = "200", description = "User updated successfully")
    })
    public ResponseEntity<?> updateUser(@RequestBody User user) throws BadRequestException, ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());

        // Verify that the authenticated user is the same as the user being updated
        if (userId != user.getId()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Update user information
        userService.updateUser(user);

        // Generate new token
        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("user_id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);

        AuthenticationResponse responseToken = AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responseToken);
    }

    @PutMapping("/limited")
    @CrossOrigin
    @Operation(summary = "Updates User but not password", description = "ID must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "User does not exist; Email already registered; Invalid password length"),
            @ApiResponse(responseCode = "200", description = "User updated successfully")
    })
    public ResponseEntity<?> updateUserLimited(@RequestBody User user) throws BadRequestException, ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());

        // Verify that the authenticated user is the same as the user being updated
        if (userId != user.getId()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Update user information
        userService.updateUserLimited(user);

        // Generate new token
        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("user_id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);

        AuthenticationResponse responseToken = AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responseToken);
    }

    @PutMapping("/role")
    @Operation(summary = "Updates User role", description = "ID must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "User does not exist"),
            @ApiResponse(responseCode = "200", description = "User role updated successfully")
    })
    public ResponseEntity<?> updateUserRole(@RequestBody User user) throws BadRequestException, ResourceNotFoundException {

        // Update user information
        userService.updateUserRole(user);

        // Generate new token
        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("user_id", user.getId());

        var jwtToken = jwtService.generateToken(extraClaims, user);

        AuthenticationResponse responseToken = AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responseToken);
    }
}
