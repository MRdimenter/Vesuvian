package ru.vesuvian.service.security.keycloak;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.security.utils.KeycloakRoles;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class KeycloakRoleManager {

    public void assignRole(RealmResource realmResource, UserResource userResource, KeycloakRoles keycloakRoles) {
        var realmRole = realmResource.roles().get(keycloakRoles.getValue()).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(realmRole));
    }
}
