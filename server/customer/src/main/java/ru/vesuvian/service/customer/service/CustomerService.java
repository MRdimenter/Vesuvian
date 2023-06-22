package ru.vesuvian.service.customer.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.exception.NotFoundException;
import ru.vesuvian.service.customer.keycloak.*;
import ru.vesuvian.service.customer.utils.KeycloakRoles;
import ru.vesuvian.service.customer.utils.mapping.CustomerMapping;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerMapping customerMapping;
    private final KeycloakUserResourceManager userResourceManager;
    private final KeycloakRoleManager roleManager;
    private final KeycloakUserRepresentationFactory userRepresentationFactory;
    private final KeycloakResponseManager responseManager;
    private final KeycloakCreateUserFactory createUserFactory;
    private final KeycloakRealmResourceManager realmResourceManager;

    @Value("${keycloak.configuration.number-of-posts-per-page}")
    private int NUMBER_OF_POSTS_PER_PAGE;

    public List<CustomerRepresentationDto> getCustomers(Integer page) {
        Optional<Integer> optionalPage = Optional.ofNullable(page);
        return optionalPage.map(this::getPagedCustomers)
                .orElseGet(this::getAllCustomers);
    }

    private List<CustomerRepresentationDto> getPagedCustomers(Integer page) {
        return customerMapping.mapUserRepresentationsToDtos(
                userResourceManager.getUsersResource(realmResourceManager.getRealmResource())
                        .search(null, (--page) * NUMBER_OF_POSTS_PER_PAGE, NUMBER_OF_POSTS_PER_PAGE)
        );
    }

    private List<CustomerRepresentationDto> getAllCustomers() {
        return customerMapping.mapUserRepresentationsToDtos(
                userResourceManager.getUsersResource(realmResourceManager.getRealmResource())
                        .search(null));
    }

    public CustomerRepresentationDto getCustomerById(String id) {
        try {
            var realmResource = realmResourceManager.getRealmResource();
            var userResource = userResourceManager.getUsersResource(realmResource);
            var userRepresentation = userResourceManager.getUserRepresentation(userResource, id);

            return CustomerRepresentationDto.fromUserRepresentation(userRepresentation);
        } catch (javax.ws.rs.NotFoundException e) {
            var errorMsg = String.format("User with id %s not found", id);
            throw new NotFoundException(errorMsg);
        }

    }

    public CustomerRepresentationDto getMe() {
        var id = SecurityContextHolder.getContext().getAuthentication().getName();
        var realmResource = realmResourceManager.getRealmResource();
        var usersResource = userResourceManager.getUsersResource(realmResource);
        var userRepresentation = usersResource.get(id).toRepresentation();

        return CustomerRepresentationDto.fromUserRepresentation(userRepresentation);
    }

    public void createCustomer(CustomerRegistrationDto customer) {
        var realmResource = realmResourceManager.getRealmResource();
        var userRepresentation = userRepresentationFactory.createUserRepresentation(customer);

        var response = createUserFactory.createUser(realmResource, userRepresentation);
        responseManager.handleUserCreationResponse(response);

        var userId = responseManager.getUserIdFromClient(response);
        var userResource = userResourceManager.getUserResource(realmResource, userId);

        roleManager.assignRole(realmResource, userResource, KeycloakRoles.USER);

        responseManager.logCustomerCreation(response);
    }


    public void updateCustomer(CustomerUpdateDto customerDto) {
        String authenticatedUserId = responseManager.getUserIdFromSpringSecurity();

        var realmResource = realmResourceManager.getRealmResource();
        var usersResource = userResourceManager.getUsersResource(realmResource);
        var authenticatedUser = usersResource.get(authenticatedUserId).toRepresentation();

        responseManager.handleValidateUserAuthentication(customerDto.username(), authenticatedUser.getUsername());

        authenticatedUser.setFirstName(customerDto.firstName());
        authenticatedUser.setLastName(customerDto.lastName());
        authenticatedUser.setEmail(customerDto.email());

        var userResource = userResourceManager.getUserResource(realmResource, authenticatedUserId);
        userResource.update(authenticatedUser);
    }


}
