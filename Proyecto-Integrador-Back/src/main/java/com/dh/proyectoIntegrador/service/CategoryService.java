package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.entity.Category;
import com.dh.proyectoIntegrador.entity.Feature;
import com.dh.proyectoIntegrador.entity.Image;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.CategoryRepository;
import com.dh.proyectoIntegrador.repository.ImageRepository;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final static Logger LOGGER = Logger.getLogger(ProductService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public  Category saveCategory(Category category){
        return categoryRepository.save(category);
    }


    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategory(Long id) throws ResourceNotFoundException {
        Optional<Category> foundCategory = categoryRepository.findById(id);
        if (foundCategory.isEmpty()) {
            LOGGER.warn("Category does not exist");
            throw new ResourceNotFoundException("Category does not exist");
        } else
            LOGGER.info("Category found successfully");
        return foundCategory.get();
    }




     public void deleteCategory(Long id) throws ResourceNotFoundException {
        Optional<Category> foundCategory = categoryRepository.findById(id);
        if (foundCategory.isEmpty()) {
            LOGGER.warn("Category does not exist");
            throw new ResourceNotFoundException("Category does not exist");
        } else{

            LOGGER.info("Category deleted successfully");

         for (Product product : productRepository.findAll()) {
             if(product.getCategory().getId().equals(id)){
             productRepository.deleteById(product.getId());}
         }

        categoryRepository.deleteById(id);
        }


    }

}



