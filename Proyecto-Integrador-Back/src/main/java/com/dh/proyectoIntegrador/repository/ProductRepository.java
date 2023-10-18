package com.dh.proyectoIntegrador.repository;

import com.dh.proyectoIntegrador.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository <Product, Long> {
    Optional<Product> findByName(String name);

    @Query(value = "SELECT * FROM product p WHERE p.id NOT IN (SELECT fk_product FROM reservation r WHERE ?1 <= r.end_date AND ?2 >= r.start_date);" , nativeQuery = true)
    List<Product> findAvailableProducts(LocalDate startDate, LocalDate endDate);
}
