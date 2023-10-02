package ru.vesuvian.service.customer.service;


import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.dto.PageCustomerRepresentationDto;
import ru.vesuvian.service.customer.keycloak.KeycloakCustomerService;
import ru.vesuvian.service.customer.postgres.PostgresCustomerService;
import ru.vesuvian.service.customer.rabbitmq.CustomerRegistrationEventPublisher;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerService {
    final KeycloakCustomerService keycloakCustomerService;
    final PostgresCustomerService postgresCustomerService;
    final CustomerRegistrationEventPublisher customerRegistrationEventPublisher;
    @Value("${application.default.page}")
    int defaultPage;
    @Value("${application.default.size}")
    int defaultSize;

    public PageCustomerRepresentationDto getCustomers(Integer page, Integer size) {
        int actualPage = Optional.ofNullable(page).orElse(defaultPage);
        int actualSize = Optional.ofNullable(size).orElse(defaultSize);
        return keycloakCustomerService.getPagedCustomersFromKeycloak(actualPage, actualSize);
    }

    public CustomerGetDto getCustomerById(String customerId) {
        return postgresCustomerService.getCustomerById(customerId);
    }

    public CustomerGetDto getMe() {
        return keycloakCustomerService.getCustomerInfoFromKeycloak();
    }

    @Transactional
    public void createCustomer(CustomerRegistrationDto customer) {
        String customerUUID = keycloakCustomerService.createCustomerInKeycloak(customer);
        postgresCustomerService.saveCustomerInDatabase(customer, customerUUID);
        customerRegistrationEventPublisher.publishRegistrationEvent(customerUUID);
    }

    public void updateCustomer(CustomerUpdateDto customerDto) {
        keycloakCustomerService.updateCustomerInKeycloak(customerDto);
    }


}
