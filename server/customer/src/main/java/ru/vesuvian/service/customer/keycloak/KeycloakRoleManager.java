package ru.vesuvian.service.customer.keycloak;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.utils.KeycloakRoles;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class KeycloakRoleManager {

    public void assignRole(RealmResource realmResource, UserResource userResource, KeycloakRoles keycloakRoles) {
        var realmRole = realmResource.roles().get(keycloakRoles.getValue()).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(realmRole));
    }
}
