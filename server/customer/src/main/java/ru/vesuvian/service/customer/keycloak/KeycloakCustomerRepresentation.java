package ru.vesuvian.service.customer.keycloak;


import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class KeycloakCustomerRepresentation {
    public UserRepresentation createUser(CustomerRegistrationDto customer) {
        var credential = createUserPassword(customer.getPassword());
        var userRepresentation = new UserRepresentation();

        userRepresentation.setUsername(customer.getUsername());
        userRepresentation.setFirstName(customer.getFirstName());
        userRepresentation.setLastName(customer.getLastName());
        userRepresentation.setEmail(customer.getEmail());
        userRepresentation.setCredentials(Collections.singletonList(credential));
        userRepresentation.setEnabled(true);

        return userRepresentation;
    }

    private static CredentialRepresentation createUserPassword(String password) {
        var passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }

    public void updateUserPassword(CustomerUpdateDto customerUpdateDto, UserResource userResource) {
        if (customerUpdateDto.password() != null) {
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(customerUpdateDto.password());

            userResource.resetPassword(credential);
        }
    }

}
