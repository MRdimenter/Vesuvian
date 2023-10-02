package ru.vesuvian.service.customer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;


@Schema(
        name = "PaginationCustomers",
        description = "Pagination model containing the information of a page of customers"
)
public record PageCustomerRepresentationDto(
        @Schema(description = "Total pages")
        @JsonProperty("pages")
        Integer totalPages,
        @Schema(description = "Current page")
        @JsonProperty("page")
        Integer currentPage,
        @ArraySchema(schema = @Schema(name = "customers", description = "Customers"))
        @JsonProperty("customers")
        List<CustomerGetDto> customerGetDtoList

) {
    public static PageCustomerRepresentationDto createFrom(
            Integer totalPages,
            Integer zeroBasedPageNumber,
            List<CustomerGetDto> customerRepresentationList) {

        return new PageCustomerRepresentationDto(
                totalPages,
                ++zeroBasedPageNumber,
                customerRepresentationList
        );

    }
}
