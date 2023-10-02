package ru.vesuvian.service.customer.keycloak;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.dto.PageCustomerRepresentationDto;
import ru.vesuvian.service.customer.exception.NotFoundException;
import ru.vesuvian.service.customer.processing.CustomerProcessing;
import ru.vesuvian.service.customer.utils.KeycloakRoles;
import ru.vesuvian.service.customer.utils.mapping.CustomerMapping;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakCustomerService {
    private final KeycloakCustomerResourceManager userResourceManager;
    private final KeycloakRoleManager roleManager;
    private final KeycloakCustomerRepresentationFactory userRepresentationFactory;
    private final KeycloakResponseManager responseManager;
    private final KeycloakCreateUserFactory createUserFactory;
    private final KeycloakRealmResourceManager realmResourceManager;
    private final CustomerProcessing customerProcessing;
    private final CustomerMapping<UserRepresentation> customerMapping;

    public String createCustomerInKeycloak(CustomerRegistrationDto customer) {
        var realmResource = realmResourceManager.getRealmResource();
        var userRepresentation = userRepresentationFactory.createUserRepresentation(customer);

        var response = createUserFactory.createUser(realmResource, userRepresentation);
        responseManager.handleUserCreationResponse(response);

        var userId = responseManager.getUserIdFromClient(response);
        var userResource = userResourceManager.getUserResource(realmResource, userId);

        roleManager.assignRole(realmResource, userResource, KeycloakRoles.USER);


        responseManager.logCustomerCreation(response);
        return userId;
    }

    public void updateCustomerInKeycloak(CustomerUpdateDto customerDto) {
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

    public CustomerGetDto getCustomerInfoFromKeycloak() {
        var id = SecurityContextHolder.getContext().getAuthentication().getName();
        var realmResource = realmResourceManager.getRealmResource();
        var usersResource = userResourceManager.getUsersResource(realmResource);
        var userRepresentation = usersResource.get(id).toRepresentation();

        return customerMapping.mapToCustomerGetDto(userRepresentation);
    }

    public CustomerGetDto getCustomerByIdInKeycloak(String id) {
        try {
            var realmResource = realmResourceManager.getRealmResource();
            var userResource = userResourceManager.getUsersResource(realmResource);
            var userRepresentation = userResourceManager.getUserRepresentation(userResource, id);

            return customerMapping.mapToCustomerGetDto(userRepresentation);
        } catch (NotFoundException e) {
            var errorMsg = String.format("User with id %s not found", id);
            throw new NotFoundException(errorMsg);
        }
    }

    public PageCustomerRepresentationDto getPagedCustomersFromKeycloak(Integer page, Integer size) {
        var realm = realmResourceManager.getRealmResource();
        var usersResource = userResourceManager.getUsersResource(realm);

        // Вычисление общего количества страниц
        int totalPageCount = customerProcessing.calculateTotalPageCount(usersResource.count(), size);

        // Пересчитываем номер страницы, отсчет начинается с 0
        int zeroBasedPageNumber = page - 1;
        int offset = zeroBasedPageNumber * size;

        var customersData = customerProcessing.retrieveUsersData(usersResource, offset, size);

        return PageCustomerRepresentationDto.createFrom(totalPageCount, zeroBasedPageNumber, customersData);
    }
}
