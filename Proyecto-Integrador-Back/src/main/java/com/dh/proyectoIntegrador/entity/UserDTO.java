package com.dh.proyectoIntegrador.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    private String name;

    private String lastname;

    private String email;

    private Role role;

    public UserDTO(String name, String lastname, String email, Role role) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
    }
}
