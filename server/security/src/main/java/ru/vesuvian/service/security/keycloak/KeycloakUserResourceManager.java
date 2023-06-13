package ru.vesuvian.service.security.keycloak;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.security.config.KeycloakPropsConfig;
import ru.vesuvian.service.security.dto.CustomerRegistrationDto;
import ru.vesuvian.service.security.error.ErrorCode;
import ru.vesuvian.service.security.exception.UserExistsException;
import ru.vesuvian.service.security.utils.KeycloakRoles;

import javax.annotation.PostConstruct;
import javax.ws.rs.core.Response;
import java.util.Collections;


@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakCustomerManager {
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;
    private RealmResource realmResource;

    @PostConstruct
    public void init() {
        realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
    }

    public UserRepresentation getUserRepresentation(String id) {
        return getUsersResource().get(id).toRepresentation();
    }

    public RealmResource getRealmResource() {
        return realmResource;
    }

    public UserResource getUserResource(String id) {
        return realmResource.users().get(id);
    }

    public String getUserId(Response response) {
        return CreatedResponseUtil.getCreatedId(response);
    }

    public UsersResource getUsersResource() {
        return realmResource.users();
    }

    public Response createUser(UserRepresentation userRepresentation) {
        return realmResource.users().create(userRepresentation);
    }


}
