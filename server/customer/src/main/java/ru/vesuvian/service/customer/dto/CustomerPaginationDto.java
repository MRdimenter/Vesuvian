package ru.vesuvian.service.customer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;

import java.util.List;

@Schema(
        name = "PaginationCustomers",
        description = "Pagination model containing the information of a page of customers"
)
public record CustomerPaginationDto<T>(
        @Schema(description = "Total pages")
        @JsonProperty("pages")
        Integer totalPages,
        @Schema(description = "Current page")
        @JsonProperty("page")
        Integer currentPage,
        @ArraySchema(schema = @Schema(name = "customers", description = "Customers"))
        @JsonProperty("customers")
        T customerList
) {
    public static CustomerPaginationDto<List<CustomerGetDto>> createFromList(
            Integer totalPages,
            Integer zeroBasedPageNumber,
            List<CustomerGetDto> customerList
    ) {
        return new CustomerPaginationDto<>(
                totalPages,
                ++zeroBasedPageNumber,
                customerList
        );
    }
}