package com.dh.proyectoIntegrador.controller;

import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.entity.Reservation;
import com.dh.proyectoIntegrador.entity.User;
import com.dh.proyectoIntegrador.entity.UserDTO;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.service.ProductService;
import com.dh.proyectoIntegrador.service.ReservationService;
import com.dh.proyectoIntegrador.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @Autowired
    UserService userService;

    @Autowired
    ObjectMapper mapper;

    @PostMapping
    @Operation(summary = "Creates a new Reservation", description = "Date range must be valid. Product and User must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Invalid date range"),
            @ApiResponse(responseCode = "201", description = "Reservation created successfully")
    })
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) throws BadRequestException, ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        UserDTO userDTO = userService.getUserById(userId);
        reservation.setUser(mapper.convertValue(userDTO, User.class));
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.createReservation(reservation));
    }
    @GetMapping("/all")
    @Operation(summary = "Gets all Reservations", description = "For ADMIN")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations founded successfully")
    })
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Gets a Reservation by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Reservation does not exist"),
            @ApiResponse(responseCode = "200", description = "Reservation founded successfully")
    })
    public ResponseEntity<?> getReservation(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.getReservationById(id));
    }

    @GetMapping("/user")
    @Operation(summary = "Gets all Reservations by User ID", description = "User token must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations founded successfully")
    })
    public ResponseEntity<?> getReservationByUserId() throws ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.getReservationByUserId(userId));
    }

    @GetMapping("/product/{productId}")
    @Operation(summary = "Gets all Reservations by Product ID", description = "Product ID must be valid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservations founded successfully")
    })
    public ResponseEntity<?> getReservationByProductId(@PathVariable Long productId) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.getReservationByProductId(productId));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a Reservation by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Reservation does not exist"),
            @ApiResponse(responseCode = "200", description = "Reservation deleted successfully")
    })
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) throws ResourceNotFoundException {
        reservationService.deleteReservation(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
