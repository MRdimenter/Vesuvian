package ru.vesuvian.service.customer.dto;

public record CustomerUpdateDto(
        String username,
        String firstName,
        String lastName,
        String email) {
}
