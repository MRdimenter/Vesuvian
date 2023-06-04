package ru.vesuvian.service.security.utils;

public enum KeycloakRoles {
    USER("user"),
    ADMIN("admin");
    private final String value;

    KeycloakRoles(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
