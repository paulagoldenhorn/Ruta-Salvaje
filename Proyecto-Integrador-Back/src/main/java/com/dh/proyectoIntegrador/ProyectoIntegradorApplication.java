package com.dh.proyectoIntegrador;

import com.dh.proyectoIntegrador.entity.Image;
import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import com.dh.proyectoIntegrador.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
public class 	ProyectoIntegradorApplication  {

	public static void main(String[] args) {
		SpringApplication.run(ProyectoIntegradorApplication.class, args);
	}

}
