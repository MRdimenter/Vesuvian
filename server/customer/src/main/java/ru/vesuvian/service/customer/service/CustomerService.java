package ru.vesuvian.service.customer.service;


import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.dto.PageCustomerRepresentationDto;
import ru.vesuvian.service.customer.keycloak.KeycloakCustomerService;
import ru.vesuvian.service.customer.postgres.PostgresCustomerService;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerService {
    final KeycloakCustomerService keycloakCustomerService;
    final PostgresCustomerService postgresCustomerService;

    @Value("${application.default.page}")
    int defaultPage;
    @Value("${application.default.size}")
    int defaultSize;

    public PageCustomerRepresentationDto getCustomers(Integer page, Integer size) {
        int actualPage = Optional.ofNullable(page).orElse(defaultPage);
        int actualSize = Optional.ofNullable(size).orElse(defaultSize);
        return keycloakCustomerService.getPagedCustomersFromKeycloak(actualPage, actualSize);
    }

    public CustomerRepresentationDto getCustomerById(String id) {
        return keycloakCustomerService.getCustomerByIdInKeycloak(id);
    }

    public CustomerRepresentationDto getMe() {
        return keycloakCustomerService.getCustomerInfoFromKeycloak();
    }

    @Transactional
    public void createCustomer(CustomerRegistrationDto customer) {
        String userId = keycloakCustomerService.createCustomerInKeycloak(customer);
        postgresCustomerService.saveCustomerInDatabase(customer, userId);

    }

    public void updateCustomer(CustomerUpdateDto customerDto) {
        keycloakCustomerService.updateCustomerInKeycloak(customerDto);
    }


}
