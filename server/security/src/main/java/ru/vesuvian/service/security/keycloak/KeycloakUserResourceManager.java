package ru.vesuvian.service.security.keycloak;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;


@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakUserResourceManager {


    public UserRepresentation getUserRepresentation(UsersResource usersResource, String id) {
        return usersResource.get(id).toRepresentation();
    }


    public UserResource getUserResource(RealmResource realmResource, String id) {
        return realmResource.users().get(id);
    }

    public UsersResource getUsersResource(RealmResource realmResource) {
        return realmResource.users();
    }




}
