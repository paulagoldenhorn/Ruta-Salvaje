package com.dh.proyectoIntegrador.controller;


import com.dh.proyectoIntegrador.entity.Feature;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.CategoryRepository;
import com.dh.proyectoIntegrador.repository.FeatureRepository;
import com.dh.proyectoIntegrador.service.CategoryService;
import com.dh.proyectoIntegrador.service.FeatureService;
import com.dh.proyectoIntegrador.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feature")
public class FeatureController {

    @Autowired
    FeatureService featureService;

    @Autowired
    FeatureRepository featureRepository;


    @PostMapping
    @Operation(summary = "Creates a new feature", description = "ID must be null")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Feature name already being used"),
            @ApiResponse(responseCode = "201", description = "Feature created successfully")
    })
    public ResponseEntity<?> createFeature(@RequestBody Feature feature) throws BadRequestException {

        return ResponseEntity.status(HttpStatus.CREATED).body(featureService.saveFeature(feature));
    }

    /*
    @GetMapping("/{id}")
    @Operation(summary = "Gets a Product by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Product does not exist"),
            @ApiResponse(responseCode = "200", description = "Product founded successfully")
    })
    @CrossOrigin
    public ResponseEntity<?> getProduct(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProduct(id));
    }
*/

    @GetMapping("/all")
    @Operation(summary = "Gets all features", description = "Response is pageable: 'page' represents the number of page and 'size' the number of registries to get")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "feature founded successfully")
    })
    public ResponseEntity<List<Feature>> getAllFeatures() {
        return ResponseEntity.status(HttpStatus.OK).body(featureService.getAllFeatures());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Gets a Feature by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Feature does not exist"),
            @ApiResponse(responseCode = "200", description = "Feature found successfully")
    })
    public ResponseEntity<?> getFeature(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(featureService.getFeature(id));
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a Feature by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Feature does not exist"),
            @ApiResponse(responseCode = "200", description = "Feature deleted successfully")
    })
    public ResponseEntity<?> deleteFeature(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        featureService.deleteFeature(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping
    @Operation(summary = "Updates a feature", description = "ID must not be null")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Feature not updated"),
            @ApiResponse(responseCode = "202", description = "Feature updated successfully")
    })
    public ResponseEntity<?> updateFeature(@RequestBody Feature feature) throws BadRequestException {

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(featureService.updateFeature(feature));
    }

}
