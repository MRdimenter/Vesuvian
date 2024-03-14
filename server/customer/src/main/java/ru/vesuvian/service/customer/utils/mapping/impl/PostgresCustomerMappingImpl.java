package ru.vesuvian.service.customer.utils.mapping.impl;

import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.entity.Customer;
import ru.vesuvian.service.customer.utils.mapping.PostgresCustomerMapping;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostgresCustomerMappingImpl implements PostgresCustomerMapping<Customer> {
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
    public void updateFromDto(CustomerUpdateDto customerUpdateDto, Customer customer) {
        customer.setFirstName(customerUpdateDto.firstName() != null ? customerUpdateDto.firstName() : customer.getFirstName());
        customer.setLastName(customerUpdateDto.lastName() != null ? customerUpdateDto.lastName() : customer.getLastName());
        customer.setEmail(customerUpdateDto.email() != null ? customerUpdateDto.email() : customer.getEmail());
        customer.setUsername(customerUpdateDto.username() != null ? customerUpdateDto.username() : customer.getUsername());
        customer.setModifiedAt(LocalDateTime.now(Clock.systemDefaultZone()));
    }
}
