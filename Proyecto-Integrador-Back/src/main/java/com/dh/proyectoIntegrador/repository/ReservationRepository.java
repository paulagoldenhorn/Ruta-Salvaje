package com.dh.proyectoIntegrador.repository;

import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.entity.Reservation;
import com.dh.proyectoIntegrador.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<List<Reservation>> findByProductId(Long id);
    Optional<List<Reservation>> findByUserId(Long id);
    @Query(value = "SELECT * FROM reservation r WHERE fk_product = ?1 AND ?2 <= r.end_date AND ?3 >= r.start_date;" , nativeQuery = true)
    List<Reservation> verifyProductAvailability(Long productId, LocalDate startDate, LocalDate endDate);
}