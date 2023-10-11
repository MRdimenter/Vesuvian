package ru.vesuvian.service.customer.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.keycloak.KeycloakCustomerService;
import ru.vesuvian.service.customer.keycloak.KeycloakResponseManager;
import ru.vesuvian.service.customer.postgres.PostgresCustomerService;
import ru.vesuvian.service.customer.rabbitmq.CustomerRegistrationEventPublisher;


@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerService {
    private final KeycloakCustomerService keycloakCustomerService;
    private final PostgresCustomerService postgresCustomerService;
    private final CustomerRegistrationEventPublisher customerRegistrationEventPublisher;
    private final KeycloakResponseManager keycloakResponseManager;

    public Page<CustomerGetDto> getCustomers(int page, int size, long lastId) {
        return postgresCustomerService.getCustomers(page, size, lastId);
    }

    public CustomerGetDto getCustomerById(String customerId) {
        return postgresCustomerService.getCustomerById(customerId);
    }

    public CustomerGetDto getMe() {
        var id = keycloakResponseManager.getUserIdFromSpringSecurity();
        return postgresCustomerService.getCustomerById(id);
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
