package ru.vesuvian.service.customer.dto;

public record CustomerUpdateDto(
        String firstName,
        String lastName,
        String email
) {
}
