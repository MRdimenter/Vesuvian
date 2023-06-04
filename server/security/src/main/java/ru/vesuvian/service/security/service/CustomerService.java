package ru.vesuvian.service.security.service;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.security.config.KeycloakPropsConfig;
import ru.vesuvian.service.security.model.Customer;
import ru.vesuvian.service.security.utils.KeycloakRoles;

import javax.ws.rs.core.Response;
import java.util.Collections;

@Service
@Slf4j
public class CustomerService {
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;


    public CustomerService(Keycloak keycloak, KeycloakPropsConfig keycloakPropsConfig) {
        this.keycloak = keycloak;
        this.keycloakPropsConfig = keycloakPropsConfig;
    }

    public void createCustomer(Customer customer) {
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
