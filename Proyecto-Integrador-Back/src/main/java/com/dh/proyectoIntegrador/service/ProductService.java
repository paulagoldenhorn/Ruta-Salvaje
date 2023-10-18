package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.entity.*;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.CategoryRepository;
import com.dh.proyectoIntegrador.repository.FeatureRepository;
import com.dh.proyectoIntegrador.repository.ImageRepository;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service

public class ProductService {

    private final static Logger LOGGER = Logger.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private ImageService imageService;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ReservationService reservationService;



    public Product createProduct(Product product) throws BadRequestException {
        if (productRepository.findByName(product.getName()).isPresent()) {
            LOGGER.warn("Product name already being used");
            throw new BadRequestException("Product name already being used");
        }
        Category productCategory = product.getCategory();

        if (productCategory != null && categoryRepository.findById(productCategory.getId()).isEmpty()) {
            Category savedCategory = categoryService.saveCategory(productCategory);
            product.setCategory(savedCategory);
        }
        else if(categoryRepository.findById(productCategory.getId()).isPresent()){
            product.setCategory(categoryRepository.findById(productCategory.getId()).get());
        }

        for (int i=0; i<product.getSideImages().size(); i++){
            product.getSideImages().get(i).setProduct(product);
            imageService.saveImage(product.getSideImages().get(i));}



        LOGGER.info("Product saved successfully");
        return productRepository.save(product);
    }

    public Product getProduct(Long id) throws ResourceNotFoundException {
        Optional<Product> foundedProduct = productRepository.findById(id);
        if (foundedProduct.isEmpty()) {
            LOGGER.warn("Product does not exist");
            throw new ResourceNotFoundException("Product does not exist");
        } else
            LOGGER.info("Product founded successfully");
            return foundedProduct.get();
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<Product> getAllAvailableProducts(LocalDate startDate, LocalDate endDate) {
        return productRepository.findAvailableProducts(startDate, endDate);
    }

    public void deleteProduct(Long id) throws ResourceNotFoundException {
        Optional<Product> foundedProduct = productRepository.findById(id);
        if (foundedProduct.isEmpty()) {
            LOGGER.warn("Product does not exist");
            throw new ResourceNotFoundException("Product does not exist");
        } else
            LOGGER.info("Product deleted successfully");
            imageRepository.deleteById(foundedProduct.get().getMainImage().getId());

                // Usar un bucle forEach para iterar a través del array e imprimir cada número
        for (Image image : foundedProduct.get().getSideImages()) {
            image.setProduct(null);
            imageRepository.deleteById(image.getId());
        }



            productRepository.deleteById(id);
    }

    public Product updateProduct(Product modifiedProduct) throws BadRequestException{

        if (modifiedProduct.getId()==null || modifiedProduct.getCategory()==null || modifiedProduct.getName()==null ||
                modifiedProduct.getDescription() == null ||
                modifiedProduct.getMainImage() == null || String.valueOf(modifiedProduct.getPrice()) == null ){
            throw new BadRequestException("Not all mandatory data sets to modify this product were included ");
        }

        Optional<Product> productInDB = productRepository.findById(modifiedProduct.getId());
        /* If there's a product founded by the given name, we must check if it's the product we want
           to update or not (in that case, the operation isn't permitted because there can't be
           two different products with the same name) */
        if (productInDB.isPresent()) {

            productInDB.get().setName(modifiedProduct.getName());
            productInDB.get().setDescription(modifiedProduct.getDescription());
            productInDB.get().setPrice(modifiedProduct.getPrice());


       if(modifiedProduct.getMainImage().getId() != null ) {
           if(imageRepository.findById(modifiedProduct.getMainImage().getId()).isPresent()){
               productInDB.get().setMainImage(imageService.updateImage(modifiedProduct.getMainImage()));}

            else throw new BadRequestException("image ID not found");
        } else productInDB.get().setMainImage(imageService.saveImage(modifiedProduct.getMainImage()));



        for (Image image : productInDB.get().getSideImages()) {
                image.setProduct(null);
                imageRepository.deleteById(image.getId());
            }
            productInDB.get().getSideImages().clear();

       for(int i=0; i<modifiedProduct.getSideImages().size();i++){

               modifiedProduct.getSideImages().get(i).setProduct(productInDB.get());
               imageService.saveImage(modifiedProduct.getSideImages().get(i));
       }

        if (categoryRepository.findById(modifiedProduct.getCategory().getId()).isPresent()){
            productInDB.get().setCategory(categoryRepository.findById(modifiedProduct.getCategory().getId()).get());
        } else throw new BadRequestException("Category ID not found ");

        productInDB.get().setFeatures(modifiedProduct.getFeatures());


    }
        return productRepository.save(productInDB.get());

    }

    public List<String[]> getProductReservedDates(Long id) {
        Optional<List<Reservation>> reservationsOptional = reservationService.getReservationByProductId(id);

        if(reservationsOptional.isEmpty()){
            return new ArrayList<>();
        }

        List<Reservation> reservations = reservationsOptional.get();
        List<String[]> dates = new ArrayList<>();
        for (Reservation reservation : reservations) {
            String[] datePair = new String[2];
            datePair[0] = String.valueOf(reservation.getStart_date());
            datePair[1] = String.valueOf(reservation.getEnd_date());
            dates.add(datePair);
        }

        return dates;
    }
}