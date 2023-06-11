package ru.vesuvian.service.security.service;


import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.security.config.KeycloakPropsConfig;
import ru.vesuvian.service.security.dto.CustomerRegistrationDto;
import ru.vesuvian.service.security.dto.CustomerRepresentationDto;
import ru.vesuvian.service.security.exception.NotFoundException;
import ru.vesuvian.service.security.keycloak.KeycloakCustomerManager;
import ru.vesuvian.service.security.utils.mapping.CustomerMapping;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class CustomerService {
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;
    private final CustomerMapping customerMapping;
    private final KeycloakCustomerManager keycloakCustomerManager;

    @Value("${keycloak.configuration.number-of-posts-per-page}")
    private int NUMBER_OF_POSTS_PER_PAGE;

    public CustomerService(Keycloak keycloak, KeycloakPropsConfig keycloakPropsConfig, CustomerMapping customerMapping, KeycloakCustomerManager keycloakCustomerManager) {
        this.keycloak = keycloak;
        this.keycloakPropsConfig = keycloakPropsConfig;
        this.customerMapping = customerMapping;
        this.keycloakCustomerManager = keycloakCustomerManager;
    }

    public List<CustomerRepresentationDto> getCustomers(Optional<Integer> page) {
        return page.map(this::getPagedCustomers)
                .orElseGet(this::getAllCustomers);
    }

    private List<CustomerRepresentationDto> getPagedCustomers(Integer page) {
        return customerMapping.mapUserRepresentationsToDtos(
                keycloak.realm(keycloakPropsConfig.getRealm()).users()
                        .search(null, (--page) * NUMBER_OF_POSTS_PER_PAGE, NUMBER_OF_POSTS_PER_PAGE)
        );
    }

    private List<CustomerRepresentationDto> getAllCustomers() {
        return customerMapping.mapUserRepresentationsToDtos(
                keycloak.realm(keycloakPropsConfig.getRealm()).users()
                        .search(null)
        );
    }

    public CustomerRepresentationDto getCustomerById(String id) {
        try {
            var usersResource = keycloak.realm(keycloakPropsConfig.getRealm()).users();
            var userRepresentation = usersResource.get(id).toRepresentation();

            return CustomerRepresentationDto.fromUserRepresentation(userRepresentation);
        } catch (javax.ws.rs.NotFoundException e) {
            var errorMsg = String.format("User with id %s not found", id);
            throw new NotFoundException(errorMsg);
        }

    }

    public CustomerRepresentationDto getMe() {
        var id = SecurityContextHolder.getContext().getAuthentication().getName();
        var usersResource = keycloak.realm(keycloakPropsConfig.getRealm()).users();
        var userRepresentation = usersResource.get(id).toRepresentation();

        return CustomerRepresentationDto.fromUserRepresentation(userRepresentation);
    }

    public void createCustomer(CustomerRegistrationDto customer) {

        var realmResource = keycloakCustomerManager.getRealmResource();
        var userRepresentation = keycloakCustomerManager.getUserRepresentation(customer);

        var response = realmResource.users().create(userRepresentation);
        keycloakCustomerManager.handleUserCreationResponse(response);

        var userResource = keycloakCustomerManager.getUserResource(response, realmResource);
        keycloakCustomerManager.assignUserRole(userResource, realmResource);

        keycloakCustomerManager.logCustomerCreation(response);
    }


}
