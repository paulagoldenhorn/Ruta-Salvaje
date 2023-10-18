package com.dh.proyectoIntegrador.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    BASIC("BASIC"),
    ADMIN("ADMIN");

    private final String roleName;

    public String getRoleName() {
        return roleName;
    }
}
