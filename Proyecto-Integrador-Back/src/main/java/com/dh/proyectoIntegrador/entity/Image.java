package com.dh.proyectoIntegrador.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name="image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String src;

    @Column
    private String alt;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_product")
    private Product product;

    public Image(String src, String alt, Product product) {
        this.src = src;
        this.alt = alt;
        this.product = product;
    }

    public Image(String src, String alt) {
        this.src = src;
        this.alt = alt;
    }

}
