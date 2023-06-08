package ru.vesuvian.service.security.service;


import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.security.config.KeycloakPropsConfig;
import ru.vesuvian.service.security.dto.CustomerRegistrationDto;
import ru.vesuvian.service.security.dto.CustomerRepresentationDto;
import ru.vesuvian.service.security.utils.KeycloakRoles;
import ru.vesuvian.service.security.utils.mapping.CustomerMapping;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CustomerService {
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;
    private final CustomerMapping customerMapping;

    @Value("${keycloak.configuration.number-of-posts-per-page}")
    private int NUMBER_OF_POSTS_PER_PAGE;

    public CustomerService(Keycloak keycloak, KeycloakPropsConfig keycloakPropsConfig, CustomerMapping customerMapping) {
        this.keycloak = keycloak;
        this.keycloakPropsConfig = keycloakPropsConfig;
        this.customerMapping = customerMapping;
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
        return customerMapping.mapUserRepresentationToDto(
                keycloak.realm(keycloakPropsConfig.getRealm())
                        .users()
                        .get(id)
                        .toRepresentation()
        );
    }

    public void createCustomer(CustomerRegistrationDto customer) {
        var realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
        var credential = createPasswordCredentials(customer.getPassword());
        var userRepresentation = new UserRepresentation();

        userRepresentation.setUsername(customer.getUsername());
        userRepresentation.setFirstName(customer.getFirstName());
        userRepresentation.setLastName(customer.getLastName());
        userRepresentation.setEmail(customer.getEmail());
        userRepresentation.setEmailVerified(true);
        userRepresentation.setCredentials(Collections.singletonList(credential));

        userRepresentation.setEnabled(true);

        Response response = realmResource.users().create(userRepresentation);

        // get new customer
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource userResource = realmResource.users().get(userId);
        RoleRepresentation guestRealmRole = realmResource.roles().get(KeycloakRoles.USER.getValue()).toRepresentation();

        // Assign realm role USER to customer
        userResource.roles().realmLevel().add(Collections.singletonList(guestRealmRole));
        log.info("realm: " + keycloakPropsConfig.getRealm());
        log.info("status: " + response.getStatus());
        log.info("role: " + KeycloakRoles.USER.getValue());
        log.info("customer id: " + userId);
    }

    public static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }


}
