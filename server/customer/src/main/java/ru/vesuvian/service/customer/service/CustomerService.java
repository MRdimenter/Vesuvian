package ru.vesuvian.service.customer.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.dto.PageCustomerRepresentationDto;
import ru.vesuvian.service.customer.exception.NotFoundException;
import ru.vesuvian.service.customer.keycloak.*;
import ru.vesuvian.service.customer.processing.CustomerProcessing;
import ru.vesuvian.service.customer.utils.KeycloakRoles;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerService {
    private final KeycloakUserResourceManager userResourceManager;
    private final KeycloakRoleManager roleManager;
    private final KeycloakUserRepresentationFactory userRepresentationFactory;
    private final KeycloakResponseManager responseManager;
    private final KeycloakCreateUserFactory createUserFactory;
    private final KeycloakRealmResourceManager realmResourceManager;
    private final CustomerProcessing customerProcessing;
    @Value("${application.default.page}")
    private int defaultPage;
    @Value("${application.default.size}")
    private int defaultSize;

    public PageCustomerRepresentationDto getCustomers(Integer page, Integer size) {
        int actualPage = Optional.ofNullable(page).orElse(defaultPage);
        int actualSize = Optional.ofNullable(size).orElse(defaultSize);
        return getPagedCustomers(actualPage, actualSize);
    }

    private PageCustomerRepresentationDto getPagedCustomers(Integer page, Integer size) {
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
