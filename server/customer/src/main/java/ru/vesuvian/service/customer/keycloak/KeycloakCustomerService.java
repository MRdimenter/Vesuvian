package ru.vesuvian.service.customer.keycloak;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.dto.PageCustomerRepresentationDto;
import ru.vesuvian.service.customer.exception.NotFoundException;
import ru.vesuvian.service.customer.processing.CustomerProcessing;
import ru.vesuvian.service.customer.utils.KeycloakRoles;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class KeycloakCustomerService {
    final KeycloakUserResourceManager userResourceManager;
    final KeycloakRoleManager roleManager;
    final KeycloakUserRepresentationFactory userRepresentationFactory;
    final KeycloakResponseManager responseManager;
    final KeycloakCreateUserFactory createUserFactory;
    final KeycloakRealmResourceManager realmResourceManager;
    final CustomerProcessing customerProcessing;


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

    public CustomerRepresentationDto getCustomerInfoFromKeycloak() {
        var id = SecurityContextHolder.getContext().getAuthentication().getName();
        var realmResource = realmResourceManager.getRealmResource();
        var usersResource = userResourceManager.getUsersResource(realmResource);
        var userRepresentation = usersResource.get(id).toRepresentation();

        return CustomerRepresentationDto.fromUserRepresentation(userRepresentation);
    }

    public CustomerRepresentationDto getCustomerByIdInKeycloak(String id) {
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
