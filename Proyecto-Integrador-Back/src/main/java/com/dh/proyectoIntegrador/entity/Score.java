package com.dh.proyectoIntegrador.entity;

//import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private int stars;

    @OneToOne()
    @JoinColumn(name = "fk_user")
    @JsonIgnore
    private User user;

    @ManyToOne()
    @JoinColumn(name="fk_product")
    private Product product;
}
