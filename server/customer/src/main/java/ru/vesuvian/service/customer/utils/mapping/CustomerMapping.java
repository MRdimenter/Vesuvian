package ru.vesuvian.service.customer.utils.mapping;

import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.entity.Customer;

import java.util.List;

public interface CustomerMapping<T> {
    CustomerGetDto toCustomerGetDto(T source);
    List<CustomerGetDto> toCustomerGetDtos(List<T> sourceList);
    T updateFromDto(CustomerUpdateDto customerUpdateDto, Customer customer);
}
