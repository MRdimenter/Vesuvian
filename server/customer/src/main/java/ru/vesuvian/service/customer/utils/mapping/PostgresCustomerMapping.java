package ru.vesuvian.service.customer.utils.mapping;

import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.entity.Customer;

public interface PostgresCustomerMapping<T> extends CustomerMapping<T>{
    void updateFromDto(CustomerUpdateDto customerUpdateDto, Customer customer);
}
