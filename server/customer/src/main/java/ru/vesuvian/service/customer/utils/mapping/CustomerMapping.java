package ru.vesuvian.service.customer.utils.mapping;

import ru.vesuvian.service.customer.dto.CustomerGetDto;

import java.util.List;

public interface CustomerMapping<T> {
    CustomerGetDto mapToCustomerGetDto(T source);
    List<CustomerGetDto> mapToCustomerGetDtos(List<T> sourceList);
}
