package ru.vesuvian.service.security.controller;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.service.security.dto.CustomerRegistrationDto;
import ru.vesuvian.service.security.dto.CustomerRepresentationDto;
import ru.vesuvian.service.security.service.CustomerService;

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

    @GetMapping("/test")
    public String getTestData() {
        log.info("Sent response with test data");
        return "test data";
    }

    @GetMapping()
    public List<CustomerRepresentationDto> getCustomers(@RequestParam(required = false) @Min(1) Integer page) {
        return customerService.getCustomers(Optional.ofNullable(page));
    }

    @GetMapping("/{id}")
    public CustomerRepresentationDto getCustomer(@PathVariable @NotBlank String id) {
        log.info("get name: " + SecurityContextHolder.getContext().getAuthentication().getName());
        return customerService.getCustomerById(id);
    }


    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createCustomer(@RequestBody CustomerRegistrationDto customer) {
        customerService.createCustomer(customer);
    }
}
