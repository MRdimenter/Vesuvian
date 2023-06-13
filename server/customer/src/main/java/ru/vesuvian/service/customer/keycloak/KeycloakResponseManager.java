package ru.vesuvian.service.customer.keycloak;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.config.KeycloakPropsConfig;
import ru.vesuvian.service.customer.error.ErrorCode;
import ru.vesuvian.service.customer.exception.UserExistsException;
import ru.vesuvian.service.customer.utils.KeycloakRoles;

import javax.ws.rs.core.Response;

@Component
@RequiredArgsConstructor
@Slf4j
public class KeycloakResponseManager {
    private final KeycloakPropsConfig keycloakPropsConfig;

    public void handleUserCreationResponse(Response response) {
        log.info("Response status: " + response.getStatus());
        if (response.getStatus() == ErrorCode.USER_EXISTS.getCode()) {
            throw new UserExistsException("Such user already exists");
        }
    }

    public void logCustomerCreation(Response response) {
        log.info("realm: " + keycloakPropsConfig.getRealm());
        log.info("status: " + response.getStatus());
        log.info("role: " + KeycloakRoles.USER.getValue());
        log.info("customer id: " + CreatedResponseUtil.getCreatedId(response));
    }

    public String getUserId(Response response) {
        return CreatedResponseUtil.getCreatedId(response);
    }
}
