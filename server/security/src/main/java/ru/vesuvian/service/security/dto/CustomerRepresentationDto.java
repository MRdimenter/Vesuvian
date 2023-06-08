package ru.vesuvian.service.security.dto;

import org.keycloak.representations.idm.UserRepresentation;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

public record CustomerRepresentationDto(
        String id,
        String username,
        String firstName,
        String lastName,
        String email,
        LocalDateTime createdTimestamp) {

    public static CustomerRepresentationDto fromUserRepresentation(UserRepresentation userRepresentation) {
        LocalDateTime createdTimestamp = LocalDateTime.ofInstant(Instant.ofEpochMilli(userRepresentation.getCreatedTimestamp()), TimeZone.getDefault().toZoneId());

        return new CustomerRepresentationDto(userRepresentation.getId(), userRepresentation.getUsername(),
                userRepresentation.getEmail(), userRepresentation.getFirstName(), userRepresentation.getLastName(), createdTimestamp);
    }

}
