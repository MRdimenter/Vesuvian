package ru.vesuvian.service.customer.utils.mapping;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.entity.Customer;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
public class KeycloakCustomerMapping implements CustomerMapping<UserRepresentation> {
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
    public UserRepresentation updateFromDto(CustomerUpdateDto customerUpdateDto, Customer customer) {
        var userRepresentation = new UserRepresentation();
        userRepresentation.setId(customer.getUUID());
        userRepresentation.setFirstName(customerUpdateDto.firstName());
        userRepresentation.setLastName(customerUpdateDto.lastName());
        userRepresentation.setEmail(customerUpdateDto.email());

        return userRepresentation;
    }


}
