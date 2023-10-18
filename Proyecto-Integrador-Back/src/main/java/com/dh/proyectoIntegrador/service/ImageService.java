package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.entity.Image;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.repository.ImageRepository;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    public Image updateImage(Image updatedImage) {

        Image imageInDB = imageRepository.findById(updatedImage.getId()).get();

        imageInDB.setAlt(updatedImage.getAlt());
        imageInDB.setSrc(updatedImage.getSrc());
            return imageRepository.save(imageInDB);
  }
}