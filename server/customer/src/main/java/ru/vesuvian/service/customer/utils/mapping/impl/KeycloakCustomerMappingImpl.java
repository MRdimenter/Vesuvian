package ru.vesuvian.service.customer.utils.mapping.impl;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.utils.mapping.KeycloakCustomerMapping;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
public class KeycloakCustomerMappingImpl implements KeycloakCustomerMapping<UserRepresentation> {
    @Override
    public CustomerGetDto toCustomerGetDto(UserRepresentation userRepresentation) {
        var createdTimestamp = LocalDateTime.ofInstant(Instant.ofEpochMilli(userRepresentation.getCreatedTimestamp()), TimeZone.getDefault().toZoneId());

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
    public List<CustomerGetDto> toCustomerGetDtos(List<UserRepresentation> userRepresentationList) {
        return userRepresentationList.stream()
                .map(this::toCustomerGetDto)
                .collect(Collectors.toList());
    }


    @Override
    public void updateFromDto(CustomerUpdateDto customerUpdateDto, UserRepresentation userRepresentation) {
        userRepresentation.setFirstName(customerUpdateDto.firstName() != null ? customerUpdateDto.firstName() : userRepresentation.getFirstName());
        userRepresentation.setLastName(customerUpdateDto.lastName() != null ? customerUpdateDto.lastName() : userRepresentation.getLastName());
        userRepresentation.setEmail(customerUpdateDto.email() != null ? customerUpdateDto.email() : userRepresentation.getEmail());
        userRepresentation.setUsername(customerUpdateDto.username() != null ? customerUpdateDto.username() : userRepresentation.getUsername());
    }


}
