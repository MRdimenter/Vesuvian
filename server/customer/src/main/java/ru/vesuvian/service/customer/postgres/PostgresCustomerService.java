package ru.vesuvian.service.customer.postgres;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.entity.Customer;
import ru.vesuvian.service.customer.exception.ExceptionMessageProvider;
import ru.vesuvian.service.customer.exception.UserNotFoundException;
import ru.vesuvian.service.customer.repository.CustomerRepository;
import ru.vesuvian.service.customer.utils.mapping.PostgresCustomerMapping;

@Component
@Slf4j
@RequiredArgsConstructor
public class PostgresCustomerService {
    private final CustomerRepository customerRepository;
    private final PostgresCustomerMapping<Customer> customerMapping;
    private final ExceptionMessageProvider errorMsg;

    public void saveCustomerInDatabase(CustomerRegistrationDto customer, String UUID) {
        customerRepository.save(Customer.builder()
                .UUID(UUID)
                .username(customer.getUsername())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .build()
        );
    }

    public CustomerGetDto getCustomerById(String UUID) {
        var customer = customerRepository.findByUUID(UUID)
                .orElseThrow(() -> new UserNotFoundException(
                        errorMsg.userNotFound(UUID)));

        log.info(customer.toString());
        return customerMapping.toCustomerGetDto(customer);

    }

    public Page<CustomerGetDto> getCustomers(int pageNumber, int pageSize, long lastId) {
        var pageable = PageRequest.of(pageNumber - 1, pageSize);
        var customerPage = customerRepository.findAllByIdGreaterThanOrderByIdAsc(lastId, pageable);
        var customerGetDtoList = customerMapping.toCustomerGetDtos(customerPage.toList());

        return new PageImpl<>(customerGetDtoList, pageable, customerPage.getTotalElements());
    }

    public void updateCustomer(CustomerUpdateDto customerUpdateDto, String UUID) {
        var customer = customerRepository.findByUUID(UUID).orElseThrow(
                () -> new UserNotFoundException(
                        errorMsg.userNotFound(UUID)));
        customerMapping.updateFromDto(customerUpdateDto, customer);
        customerRepository.save(customer);
    }
}

