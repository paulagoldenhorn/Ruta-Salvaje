package com.dh.proyectoIntegrador.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feature")
public class Feature {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column
    private String icon;

    @JsonIgnore
    @ManyToMany(mappedBy = "features")
    private List<Product> product;


    public Feature(String name){
        this.name = name;
    }

    public Feature(String name, String icon){
        this.name = name;
        this.icon = icon;
    }

}
