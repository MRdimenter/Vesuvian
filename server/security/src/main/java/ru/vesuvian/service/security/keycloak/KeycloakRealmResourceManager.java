package ru.vesuvian.service.security.keycloak;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.security.config.KeycloakPropsConfig;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class KeycloakRealmResourceManager {
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;
    private RealmResource realmResource;

    @PostConstruct
    public void init() {
        realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
    }

    public RealmResource getRealmResource() {
        return realmResource;
    }
}
