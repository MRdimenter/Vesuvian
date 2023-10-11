package ru.vesuvian.service.customer.utils.mapping;

import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.entity.Customer;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostgresCustomerMapping implements CustomerMapping<Customer> {
    @Override
    public CustomerGetDto mapToCustomerGetDto(Customer customer) {
        return CustomerGetDto.builder()
                .id(String.valueOf(customer.getId()))
                .UUID(customer.getUUID())
                .email(customer.getEmail())
                .userName(customer.getUsername())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .creationDate(customer.getCreatedAt())
                .build();
    }

    @Override
    public List<CustomerGetDto> mapToCustomerGetDtos(List<Customer> customerList) {
        return customerList.stream()
                .map(this::mapToCustomerGetDto)
                .collect(Collectors.toList());
    }
}
