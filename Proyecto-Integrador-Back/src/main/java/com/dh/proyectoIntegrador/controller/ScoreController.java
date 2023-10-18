package com.dh.proyectoIntegrador.controller;

import com.dh.proyectoIntegrador.entity.Score;
import com.dh.proyectoIntegrador.entity.User;
import com.dh.proyectoIntegrador.entity.UserDTO;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.service.ScoreService;
import com.dh.proyectoIntegrador.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/score")
public class ScoreController {
    @Autowired
    ScoreService scoreService;
    @Autowired
    UserService userService;
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping
    @Operation(summary = "Creates a new Score", description = "ID must be null")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "product does not exist"),
            @ApiResponse(responseCode = "201", description = "Score created successfully")
    })
    public ResponseEntity<?> createScore(@RequestBody Score score) throws BadRequestException, ResourceNotFoundException {
        var userId = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        UserDTO userDTO = userService.getUserById(userId);
        score.setUser(objectMapper.convertValue(userDTO, User.class));
        return ResponseEntity.status(HttpStatus.CREATED).body(scoreService.createScore(score));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a Score by Id", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Score does not exist"),
            @ApiResponse(responseCode = "200", description = "Score founded successfully")
    })
    public ResponseEntity<?> getScore(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.getScore(id));
    }

    @GetMapping("/product/{product_id}")
    @Operation(summary = "Gets Scores by product Id", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Scores does not exist"),
            @ApiResponse(responseCode = "200", description = "Scores founded successfully")
    })
    public ResponseEntity<?> findScoresByProductId(@PathVariable Long product_id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.findScoresByProductId(product_id));
    }

    @GetMapping("/all")
    @Operation(summary = "Gets all Scores", description = "Show all scores")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "cannot show all scores"),
            @ApiResponse(responseCode = "200", description = "all scores are shown")
    })
    public ResponseEntity<?> getAllScores() throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(scoreService.getAllScores());
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "delete score by id", description = "id must exit")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "the score to be deleted does not exist"),
            @ApiResponse(responseCode = "200", description = "the score was cleared successfully")
    })
    public ResponseEntity<?> deleteScore(@PathVariable Long id) throws ResourceNotFoundException {
        scoreService.deleteScore(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}