package ru.vesuvian.service.security.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.service.security.model.Customer;
import ru.vesuvian.service.security.service.CustomerService;

@RestController
@RequestMapping("api/v1/users")
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

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody Customer customer) {
        log.info(customer.getUsername());
        log.info(customer.getFirstName());
        log.info(customer.getLastName());
        log.info(customer.getEmail());

        customerService.createCustomer(customer);
    }
}
