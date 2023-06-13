package ru.vesuvian.service.customer.config;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(
        value = "keycloak.authorization",
        //locations = "classpath:keycloak.properties",
        ignoreUnknownFields = false
        //prefix = "keycloak"
)
public class KeycloakPropsConfig {
    private String authServerUrl;
    private String realm;
    private String resource;
    private String username;
    private String password;
}
