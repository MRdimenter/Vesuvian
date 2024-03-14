package ru.vesuvian.service.customer.utils.mapping;

import org.keycloak.representations.idm.UserRepresentation;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;

public interface KeycloakCustomerMapping<T> extends CustomerMapping<T>{
    void updateFromDto(CustomerUpdateDto customerUpdateDto, UserRepresentation userRepresentation);
}
