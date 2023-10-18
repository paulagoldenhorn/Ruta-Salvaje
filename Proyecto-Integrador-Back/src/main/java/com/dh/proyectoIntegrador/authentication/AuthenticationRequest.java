package com.dh.proyectoIntegrador.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
// Body of log-in request
public class AuthenticationRequest {
    private String email;
    private String password;
}
