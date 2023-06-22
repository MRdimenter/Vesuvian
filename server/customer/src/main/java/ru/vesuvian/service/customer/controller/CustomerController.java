package ru.vesuvian.service.customer.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
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
@Tag(name = "Customer", description = "The Customer API")
public class CustomerController {
    CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @Operation(
            summary = "View a list of available customers",
            description = "View a list of available customers"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful operation",
                    content = @Content(
                            array = @ArraySchema(
                                    schema = @Schema(implementation = CustomerRepresentationDto.class)
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid credentials provided",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Forbidden - You're not allowed to access this resource",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Conflict - The request could not be completed due to a conflict with the current state of the resource",
                    content = @Content
            )
    })
    @GetMapping()
    public List<CustomerRepresentationDto> getCustomers(
            @Parameter(
                    description = "Page for displaying a list of clients",
                    name = "page"
            )
            @RequestParam(required = false, defaultValue = "1")
            @Min(1)
            int page
    ) {
        return customerService.getCustomers(page);
    }

    @Operation(
            summary = "Get current customer's information",
            description = "Fetches the information of the customer related to the current session."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful operation",
                    content = @Content(
                            schema = @Schema(implementation = CustomerRepresentationDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid session or not authenticated",
                    content = @Content
            )
    })
    @GetMapping("/me")
    public CustomerRepresentationDto getMe() {
        return customerService.getMe();
    }

    @Operation(
            summary = "Create a new customer",
            description = "Creates a new customer with the given information."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Customer created successfully",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - Invalid or missing request body",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Conflict - A customer with the same identification already exists",
                    content = @Content
            )
    })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void createCustomer(
            @Parameter(description = "Customer information", required = true)
            @RequestBody CustomerRegistrationDto customer
    ) {
        customerService.createCustomer(customer);
    }

    @Operation(
            summary = "Update existing customer",
            description = "Updates the information of an existing customer."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful operation",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - Invalid or missing request body",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - The requested customer was not found",
                    content = @Content
            )
    })
    @PutMapping()
    public void updateCustomer(
            @Parameter(description = "Updated customer information", required = true)
            @RequestBody CustomerUpdateDto customerRegistrationDto
    ) {
        customerService.updateCustomer(customerRegistrationDto);
    }
}
