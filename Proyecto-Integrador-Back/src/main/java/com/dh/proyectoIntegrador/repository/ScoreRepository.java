package com.dh.proyectoIntegrador.repository;

import com.dh.proyectoIntegrador.entity.Reservation;
import com.dh.proyectoIntegrador.entity.Score;
import com.dh.proyectoIntegrador.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Optional<Score> findById(Long id);
    List<Score> findByProductId (Long id);
}
