package ru.vesuvian.service.customer.service;


import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.vesuvian.amqp.objects.CustomerUUID;
import ru.vesuvian.amqp.RabbitMQMessageProducer;
import ru.vesuvian.service.customer.dto.*;
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
    final RabbitMQMessageProducer rabbitMQMessageProducer;
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
        String customerUUID = keycloakCustomerService.createCustomerInKeycloak(customer);
        postgresCustomerService.saveCustomerInDatabase(customer, customerUUID);

        rabbitMQMessageProducer.publish(
                new CustomerUUID(customerUUID),
                "customer.events.exchange",
                "new.customer.event");
    }

    public void updateCustomer(CustomerUpdateDto customerDto) {
        keycloakCustomerService.updateCustomerInKeycloak(customerDto);
    }


}
