package com.dh.proyectoIntegrador.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_image")
    private Image image;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> product;

    public Category(String name, String description, Image image){
        this.name = name;
        this.description = description;
        this.image=image;
    }

    public Category(String name){
        this.name = name;

    }
}
