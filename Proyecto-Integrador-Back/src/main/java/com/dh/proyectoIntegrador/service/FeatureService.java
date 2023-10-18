package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.entity.Category;
import com.dh.proyectoIntegrador.entity.Feature;
import com.dh.proyectoIntegrador.entity.Image;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.FeatureRepository;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FeatureService {

    private final static Logger LOGGER = Logger.getLogger(ProductService.class);

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private ProductService productService;

    public  Feature saveFeature(Feature feature) throws BadRequestException{
        if (featureRepository.findByName(feature.getName()).isPresent()) {
            LOGGER.warn("Feature name already being used");
            throw new BadRequestException("Feature name already being used");
        }
        return featureRepository.save(feature);
    }

    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    public void deleteFeature(Long id) throws ResourceNotFoundException, BadRequestException {
        Optional<Feature> foundFeature = featureRepository.findById(id);
        if (foundFeature.isEmpty()) {
            LOGGER.warn("Feature does not exist");
            throw new ResourceNotFoundException("Feature does not exist");
        } else {
            List<Product> products = foundFeature.get().getProduct();
            for (int i = 0; i < products.size(); i++) {
                Product prod = products.get(i);
                List<Feature> features = prod.getFeatures();

                // Busca la característica en la lista de características del producto
                Feature featureToRemove = features.stream()
                        .filter(feature -> feature.getId().equals(id))
                        .findFirst()
                        .orElse(null);

                if (featureToRemove != null) {
                    // Elimina la característica de la lista de características del producto
                    features.remove(featureToRemove);

                    // Actualiza las características del producto en la base de datos
                    prod.setFeatures(features);
                    productService.updateProduct(prod);
                }
            }

        LOGGER.info("Feature deleted successfully");
        featureRepository.deleteById(id);
        }



    }

    public Feature updateFeature(Feature modifiedFeature) throws BadRequestException {
        if(modifiedFeature.getId()==null  || modifiedFeature.getName() == null || modifiedFeature.getIcon() == null ){
            throw new BadRequestException("Not all mandatory data sets to modify this feature were included");
        }
        Optional<Feature> featureInDB = featureRepository.findByName(modifiedFeature.getName());
        /* If there's a feature founded by the given name, we must check if it's the feature we want
           to update or not (in that case, the operation isn't permitted because there can't be
           two different features with the same name) */
        if (featureInDB.isPresent()) {
            if (!Objects.equals(featureInDB.get().getId(), modifiedFeature.getId()))
                throw new BadRequestException("Feature name already registered");
        }
        return featureRepository.save(modifiedFeature);
    }

    public Feature getFeature(Long id) throws ResourceNotFoundException {
        Optional<Feature> foundFeature = featureRepository.findById(id);
        if (foundFeature.isEmpty()) {
            LOGGER.warn("Feature does not exist");
            throw new ResourceNotFoundException("Feature does not exist");
        } else
            LOGGER.info("Feature found successfully");
        return foundFeature.get();
    }



}


