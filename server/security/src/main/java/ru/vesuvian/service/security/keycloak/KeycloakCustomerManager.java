package ru.vesuvian.service.security.keycloak;

import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.security.config.KeycloakPropsConfig;
import ru.vesuvian.service.security.dto.CustomerRegistrationDto;
import ru.vesuvian.service.security.error.ErrorCode;
import ru.vesuvian.service.security.exception.UserExistsException;
import ru.vesuvian.service.security.utils.KeycloakRoles;

import javax.ws.rs.core.Response;
import java.util.Collections;



@Component
@Slf4j
public class KeycloakCustomerManager {
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;

    public KeycloakCustomerManager(Keycloak keycloak, KeycloakPropsConfig keycloakPropsConfig) {
        this.keycloak = keycloak;
        this.keycloakPropsConfig = keycloakPropsConfig;
    }

    public RealmResource getRealmResource() {
        return keycloak.realm(keycloakPropsConfig.getRealm());
    }

    public UserRepresentation getUserRepresentation(CustomerRegistrationDto customer) {
        var credential = createPasswordCredentials(customer.getPassword());
        var userRepresentation = new UserRepresentation();

        userRepresentation.setUsername(customer.getUsername());
        userRepresentation.setFirstName(customer.getFirstName());
        userRepresentation.setLastName(customer.getLastName());
        userRepresentation.setEmail(customer.getEmail());
        userRepresentation.setCredentials(Collections.singletonList(credential));
        userRepresentation.setEnabled(true);

        return userRepresentation;
    }

    public static CredentialRepresentation createPasswordCredentials(String password) {
        var passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }

    public void handleUserCreationResponse(Response response) {
        log.info("Response status: " + response.getStatus());
        if(response.getStatus() == ErrorCode.USER_EXISTS.getCode()) {
            throw new UserExistsException("Such user already exists");
        }
    }

    public UserResource getUserResource(Response response, RealmResource realmResource) {
        String userId = CreatedResponseUtil.getCreatedId(response);
        return realmResource.users().get(userId);
    }

    public void assignUserRole(UserResource userResource, RealmResource realmResource) {
        var guestRealmRole = realmResource.roles().get(KeycloakRoles.USER.getValue()).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(guestRealmRole));
    }

    public void logCustomerCreation(Response response) {
        log.info("realm: " + keycloakPropsConfig.getRealm());
        log.info("status: " + response.getStatus());
        log.info("role: " + KeycloakRoles.USER.getValue());
        log.info("customer id: " + CreatedResponseUtil.getCreatedId(response));
    }
}
