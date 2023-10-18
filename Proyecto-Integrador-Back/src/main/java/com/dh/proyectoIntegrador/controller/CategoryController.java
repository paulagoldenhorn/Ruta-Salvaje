package com.dh.proyectoIntegrador.controller;


import com.dh.proyectoIntegrador.entity.Category;
import com.dh.proyectoIntegrador.entity.Feature;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.CategoryRepository;
import com.dh.proyectoIntegrador.repository.FeatureRepository;
import com.dh.proyectoIntegrador.service.CategoryService;
import com.dh.proyectoIntegrador.service.FeatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    CategoryRepository categoryRepository;


    @PostMapping
    @Operation(summary = "Creates a new category", description = "ID must be null")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Category name already being used"),
            @ApiResponse(responseCode = "201", description = "Category created successfully")
    })
    public ResponseEntity<?> createCategory(@RequestBody Category category) throws BadRequestException {

        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.saveCategory(category));
    }


    @GetMapping("/all")
    @Operation(summary = "Gets all categories", description = "Response is pageable: 'page' represents the number of page and 'size' the number of registries to get")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category founded successfully")
    })
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Gets a Category by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Category does not exist"),
            @ApiResponse(responseCode = "200", description = "Category found successfully")
    })
    public ResponseEntity<?> getCategory(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategory(id));
    }
/*

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a Feature by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Feature does not exist"),
            @ApiResponse(responseCode = "200", description = "Feature deleted successfully")
    })
    @CrossOrigin
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
    @CrossOrigin
    public ResponseEntity<?> updateFeature(@RequestBody Feature feature) throws BadRequestException {

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(featureService.updateFeature(feature));
    }
*/

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a Category by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Category does not exist"),
            @ApiResponse(responseCode = "200", description = "Category deleted successfully")
    })
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) throws ResourceNotFoundException {
        categoryService.deleteCategory(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
