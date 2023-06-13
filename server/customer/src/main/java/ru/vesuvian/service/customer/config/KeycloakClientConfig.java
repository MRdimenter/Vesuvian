package ru.vesuvian.service.customer.config;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakClientConfig {
    KeycloakPropsConfig keycloakPropsConfig;

    public KeycloakClientConfig(KeycloakPropsConfig keycloakPropsConfig) {
        this.keycloakPropsConfig = keycloakPropsConfig;
    }

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl(keycloakPropsConfig.getAuthServerUrl())
                .realm(keycloakPropsConfig.getRealm())
                .grantType(OAuth2Constants.PASSWORD)
                .clientId(keycloakPropsConfig.getResource())
                .username(keycloakPropsConfig.getUsername())
                .password(keycloakPropsConfig.getPassword())
                .build();
    }

}
