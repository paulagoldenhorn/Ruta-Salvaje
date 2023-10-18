package com.dh.proyectoIntegrador.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_main_image")
    private Image mainImage;

    @Column
    private float price;

    @OneToMany(mappedBy ="product", cascade = CascadeType.ALL)
    private List<Image> sideImages = new ArrayList<>();

    @JoinColumn(name="fk_category")
    @ManyToOne
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "products_features",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features = new ArrayList<>();

    public Product(String name, String description, Image mainImage, float price, List<Image> sideImages) {
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.price = price;
        this.sideImages = sideImages;

    }

    public Product(String name, String description, Image mainImage, float price, Category category) {
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.price = price;
        this.category = category;

    }

    public Product(String name, String description, Image mainImage, float price, List<Image> sideImages, Category category) {
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.price = price;
        this.category = category;
        this.sideImages = sideImages;

    }

    public Product(String name, String description, Image mainImage, float price, List<Image> sideImages, Category category, List<Feature> features) {
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.price = price;
        this.category = category;
        this.sideImages = sideImages;
        this.features = features;

    }

    public Product(String name, String description, Image mainImage, float price, Category category, List<Feature> features) {
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.price = price;
        this.category = category;
        this.features = features;

    }

    public Product(String name, String description, Image mainImage, float price, Category category, List<Feature> features, List<Image> sideImages) {
        this.name = name;
        this.description = description;
        this.mainImage = mainImage;
        this.price = price;
        this.category = category;
        this.features = features;
        this.sideImages = sideImages;

    }



}


