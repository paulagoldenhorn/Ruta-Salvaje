package com.dh.proyectoIntegrador.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
// Body of server response
public class AuthenticationResponse {
    private String token;
}
