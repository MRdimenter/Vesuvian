package ru.vesuvian.service.customer.keycloak;


import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response;

@Component
@RequiredArgsConstructor
public class KeycloakCreateUserFactory {
    public Response createUser(RealmResource realmResource, UserRepresentation userRepresentation) {
        return realmResource.users().create(userRepresentation);
    }
}
