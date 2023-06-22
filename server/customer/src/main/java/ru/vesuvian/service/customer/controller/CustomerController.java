package ru.vesuvian.service.customer.controller;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.service.CustomerService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/customers")
@Slf4j
public class CustomerController {
    CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping()
    public List<CustomerRepresentationDto> getCustomers(@RequestParam(required = false) @Min(1) Integer page) {
        return customerService.getCustomers(Optional.ofNullable(page));
    }

    @GetMapping("/{id}")
    public CustomerRepresentationDto getCustomer(@PathVariable @NotBlank String id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/me")
    public CustomerRepresentationDto getMe() {
        return customerService.getMe();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createCustomer(@RequestBody CustomerRegistrationDto customer) {
        customerService.createCustomer(customer);
    }

    @PutMapping()
    public void updateCustomer(@RequestBody CustomerUpdateDto customerRegistrationDto) {
        customerService.updateCustomer(customerRegistrationDto);
    }
}
