package ru.vesuvian.service.customer.exception;

import org.springframework.stereotype.Component;

@Component
public class ExceptionMessageProvider {
    public String userNotFound(String UUID) {
        return String.format("User with id %s not found", UUID);
    }

    public String userExists() {
        return "User already exists";
    }

    public String userRightsViolation() {
        return "The provided user does not match the authenticated user";
    }
}
