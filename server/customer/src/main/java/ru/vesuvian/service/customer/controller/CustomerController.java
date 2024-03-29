package ru.vesuvian.service.customer.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.service.customer.dto.CustomerGetDto;
import ru.vesuvian.service.customer.dto.CustomerPaginationDto;
import ru.vesuvian.service.customer.dto.CustomerRegistrationDto;
import ru.vesuvian.service.customer.dto.CustomerUpdateDto;
import ru.vesuvian.service.customer.service.CustomerService;

@RestController
@RequestMapping("api/v1/customers")
@RequiredArgsConstructor
@Tag(name = "Customer", description = "The Customer API")
public class CustomerController {
    private final CustomerService customerService;

    @Operation(summary = "View a list of available customers", description = "View a list of available customers")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successful operation",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = CustomerPaginationDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid credentials provided"),
            @ApiResponse(responseCode = "403", description = "Forbidden - You're not allowed to access this resource"),
            @ApiResponse(responseCode = "409", description = "Conflict - The request could not be completed due to a conflict with the current state of the resource")
    })
    @GetMapping()
    public Page<CustomerGetDto> getCustomers(
            @Parameter(description = "The page number to retrieve. Starts from 1.", name = "page")
            @RequestParam(required = false, defaultValue = "1") int page,

            @Parameter(description = "The number of customers to retrieve per page.", name = "size")
            @RequestParam(required = false, defaultValue = "10") int size,

            @Parameter(description = "The ID of the last customer from the previous page for pagination purposes. Use 0 if not applicable.", name = "lastId")
            @RequestParam(required = false, defaultValue = "0") long lastId) {

        return customerService.getCustomers(page, size, lastId);
    }

    @Operation(
            summary = "Get customer by UUID",
            description = "Fetches the information of a customer by their UUID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful operation",
                    content = @Content(
                            schema = @Schema(implementation = CustomerGetDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid session or not authenticated",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Not Found - The requested customer was not found",
                    content = @Content
            )
    })
    @GetMapping("/{customerId}")
    public CustomerGetDto getCustomerById(
            @Parameter(description = "The UUID of the customer to retrieve", required = true, name = "customerId")
            @PathVariable String customerId
    ) {
        return customerService.getCustomerById(customerId);
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
                            schema = @Schema(implementation = CustomerGetDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid session or not authenticated",
                    content = @Content
            )
    })
    @GetMapping("/me")
    public CustomerGetDto getMe() {
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
            @RequestBody CustomerRegistrationDto customerRegistrationDto
    ) {
        customerService.createCustomer(customerRegistrationDto);
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
    @PatchMapping()
    public void updateCustomer(
            @Parameter(description = "Updated customer information", required = true)
            @RequestBody CustomerUpdateDto customerUpdateDto
    ) {
        customerService.updateCustomer(customerUpdateDto);
    }
}
