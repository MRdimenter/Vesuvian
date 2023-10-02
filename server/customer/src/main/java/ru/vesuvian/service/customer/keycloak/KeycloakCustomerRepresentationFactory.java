package ru.vesuvian.service.customer.keycloak;


import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class KeycloakCustomerRepresentationFactory {
    public UserRepresentation createUserRepresentation(CustomerRegistrationDto customer) {
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


}
