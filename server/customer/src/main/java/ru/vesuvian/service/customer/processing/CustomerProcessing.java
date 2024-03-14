package ru.vesuvian.service.customer.processing;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.UsersResource;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.utils.mapping.impl.KeycloakCustomerMappingImpl;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomerProcessing {
    private final KeycloakCustomerMappingImpl keycloakCustomerMapping;

    public int calculateTotalPageCount(int totalItemCount, int pageSize) {
        return (int) Math.ceil((double) totalItemCount / pageSize);
    }

    public List<CustomerGetDto> retrieveUsersData(UsersResource usersResource, int offset, int limit) {
        return keycloakCustomerMapping.toCustomerGetDtos(usersResource.search(null, offset, limit));
    }
}
