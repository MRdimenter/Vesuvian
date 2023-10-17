package ru.vesuvian.service.customer.utils.mapping;

import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.entity.Customer;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostgresCustomerMapping implements CustomerMapping<Customer> {
    @Override
    public CustomerGetDto toCustomerGetDto(Customer customer) {
        return CustomerGetDto.builder()
                .id(String.valueOf(customer.getId()))
                .UUID(customer.getUUID())
                .email(customer.getEmail())
                .userName(customer.getUsername())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .creationDate(customer.getCreatedAt())
                .modifiedDate(customer.getModifiedAt())
                .build();
    }

    @Override
    public List<CustomerGetDto> toCustomerGetDtos(List<Customer> customerList) {
        return customerList.stream()
                .map(this::toCustomerGetDto)
                .collect(Collectors.toList());
    }

    @Override
    public Customer updateFromDto(CustomerUpdateDto customerUpdateDto, Customer customer) {
        customer.setFirstName(customerUpdateDto.firstName());
        customer.setLastName(customerUpdateDto.lastName());
        customer.setEmail(customerUpdateDto.email());
        customer.setModifiedAt(LocalDateTime.now(Clock.systemDefaultZone()));
        return customer;
    }
}
