package ru.vesuvian.service.customer.postgres;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.entity.Customer;
import ru.vesuvian.service.customer.exception.NotFoundException;
import ru.vesuvian.service.customer.repository.CustomerRepository;
import ru.vesuvian.service.customer.utils.mapping.CustomerMapping;
import ru.vesuvian.service.customer.utils.mapping.KeycloakCustomerMapping;
import ru.vesuvian.service.customer.utils.mapping.PostgresCustomerMapping;

import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class PostgresCustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapping<Customer> customerMapping;

    public void saveCustomerInDatabase(CustomerRegistrationDto customer, String userId) {
        customerRepository.save(Customer.builder()
                .UUID(userId)
                .username(customer.getUsername())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .build()
        );
    }

    public CustomerGetDto getCustomerById(String userId) {
        var errorMsg = String.format("User with id %s not found", userId);
        var customer = customerRepository.findByUUID(userId)
                .orElseThrow(() -> new NotFoundException(errorMsg));

        log.info(customer.toString());
        return customerMapping.mapToCustomerGetDto(customer);

    }
}
