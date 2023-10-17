package ru.vesuvian.service.customer.dto;

import lombok.Builder;
import lombok.Data;
import org.keycloak.representations.idm.UserRepresentation;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

@Builder
@Data
public class CustomerGetDto {
    private final String id;
    private final String UUID;
    private final String userName;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final LocalDateTime creationDate;
    private final LocalDateTime modifiedDate;
}
