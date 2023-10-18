package com.dh.proyectoIntegrador.authentication;

import com.dh.proyectoIntegrador.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
// Body of sign-up request
public class RegisterRequest {

    private String name;

    private String lastname;

    @NotNull
    private String email;

    @NotNull
    private String password;

    private Role role;
}
