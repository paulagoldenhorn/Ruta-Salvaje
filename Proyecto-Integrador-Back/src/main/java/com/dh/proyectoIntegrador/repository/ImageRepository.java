package com.dh.proyectoIntegrador.repository;

import com.dh.proyectoIntegrador.entity.Image;
import com.dh.proyectoIntegrador.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository <Image, Long> {
    Optional<Image> findBySrc (String src);
}
