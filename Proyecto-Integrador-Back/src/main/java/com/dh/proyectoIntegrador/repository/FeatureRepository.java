package com.dh.proyectoIntegrador.repository;

import com.dh.proyectoIntegrador.entity.Category;
import com.dh.proyectoIntegrador.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeatureRepository extends JpaRepository <Feature, Long> {
    Optional<Feature> findByName(String name);
}
