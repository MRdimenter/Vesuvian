package ru.vesuvian.service.customer.exception;

public class UserRightsViolationException extends RuntimeException {
    public UserRightsViolationException(String message) {
        super(message);
    }
}