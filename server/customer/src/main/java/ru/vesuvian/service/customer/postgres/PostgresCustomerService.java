package ru.vesuvian.service.customer.postgres;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.entity.Customer;
import ru.vesuvian.service.customer.repository.CustomerRepository;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostgresCustomerService {
    final CustomerRepository customerRepository;


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
}
