package com.dh.proyectoIntegrador.controller;


import com.dh.proyectoIntegrador.entity.Category;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.CategoryRepository;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import com.dh.proyectoIntegrador.service.CategoryService;
import com.dh.proyectoIntegrador.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private static final Logger logger = LogManager.getLogger(ProductController.class);


    @Autowired
    ProductService productService;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @PostMapping
    @Operation(summary = "Creates a new Product", description = "ID must be null")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Product name already being used"),
            @ApiResponse(responseCode = "201", description = "Product created successfully")
    })
    public ResponseEntity<?> createProduct(@RequestBody Product product) throws BadRequestException {

        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(product));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Gets a Product by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Product does not exist"),
            @ApiResponse(responseCode = "200", description = "Product founded successfully")
    })
    public ResponseEntity<?> getProduct(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProduct(id));
    }

    @GetMapping("/reservedDates/{id}")
    @Operation(summary = "Gets product reserved dates", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dates founded successfully")
    })
    public ResponseEntity<?> getProductReservedDates(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductReservedDates(id));
    }


    @GetMapping("/all")
    @Operation(summary = "Gets all Products", description = "Response is pageable: 'page' represents the number of page and 'size' the number of registries to get")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Products founded successfully")
    })
    public ResponseEntity<Page<Product>> getAllProducts(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts(pageable));
    }

    @GetMapping("/startDate/{startDate}/endDate/{endDate}")
    @Operation(summary = "Gets all Products available in the selected date range", description = "Dates formar 'yyyy-MM-dd'")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Products founded successfully")
    })
    public ResponseEntity <List<Product>> getAllAvailableProducts(@PathVariable String startDate, @PathVariable String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllAvailableProducts(start, end));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a Product by ID", description = "ID must exist")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Product does not exist"),
            @ApiResponse(responseCode = "200", description = "Product deleted successfully")
    })
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) throws ResourceNotFoundException {
        productService.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping
    @Operation(summary = "Updates a product", description = "ID must not be null")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "400", description = "Product not updated"),
            @ApiResponse(responseCode = "202", description = "Product updated successfully")
    })
    public ResponseEntity<?> updateProduct(@RequestBody Product product) throws BadRequestException {

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(productService.updateProduct(product));
    }

}
