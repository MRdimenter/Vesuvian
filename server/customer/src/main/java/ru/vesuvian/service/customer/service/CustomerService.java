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

    public CustomerGetDto getCustomerById(String UUID) {
        return postgresCustomerService.getCustomerById(UUID);
    }

    public CustomerGetDto getMe() {
        var UUID = keycloakResponseManager.getUserIdFromSpringSecurity();
        return postgresCustomerService.getCustomerById(UUID);
    }

    @Transactional
    public void createCustomer(CustomerRegistrationDto customer) {
        String UUID = keycloakCustomerService.createCustomerInKeycloak(customer);
        postgresCustomerService.saveCustomerInDatabase(customer, UUID);
        customerRegistrationEventPublisher.publishRegistrationEvent(UUID);
    }

    public void updateCustomer(CustomerUpdateDto customerUpdateDto) {
        var UUID = keycloakResponseManager.getUserIdFromSpringSecurity();
        postgresCustomerService.updateCustomer(customerUpdateDto, UUID);
        keycloakCustomerService.updateCustomer(customerUpdateDto, UUID);
    }
}
