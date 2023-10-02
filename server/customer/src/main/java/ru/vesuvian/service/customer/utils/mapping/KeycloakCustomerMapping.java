package ru.vesuvian.service.customer.utils.mapping;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
public class KeycloakCustomerMapping implements CustomerMapping<UserRepresentation> {
    @Override
    public CustomerGetDto mapToCustomerGetDto(UserRepresentation userRepresentation) {
        LocalDateTime createdTimestamp = LocalDateTime.ofInstant(Instant.ofEpochMilli(userRepresentation.getCreatedTimestamp()), TimeZone.getDefault().toZoneId());

        return CustomerGetDto.builder()
                .id(userRepresentation.getId())
                .email(userRepresentation.getEmail())
                .userName(userRepresentation.getUsername())
                .firstName(userRepresentation.getFirstName())
                .lastName(userRepresentation.getLastName())
                .creationDate(createdTimestamp)
                .build();
    }

    @Override
    public List<CustomerGetDto> mapToCustomerGetDtos(List<UserRepresentation> userRepresentationList) {
        return userRepresentationList.stream()
                .map(this::mapToCustomerGetDto)
                .collect(Collectors.toList());
    }


}
