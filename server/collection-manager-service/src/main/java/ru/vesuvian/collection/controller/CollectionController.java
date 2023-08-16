package ru.vesuvian.collection.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.CollectionCreateDTO;
import ru.vesuvian.collection.dto.get.CollectionGetDTO;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.service.CollectionService;

import java.util.List;
@RestController
@RequestMapping("api/v1/collections")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@Tag(name = "Collection", description = "Collection management API")
public class CollectionController {
    final CollectionService collectionService;

    @PostMapping("/create")
    @Operation(summary = "Create a new collection",
            description = "Creates a new collection based on the provided data",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Collection created successfully"),
                    @ApiResponse(responseCode = "400", description = "Invalid input")
            })
    public void createCollection(
            @RequestBody
            @Parameter(description = "Collection data to be created", required = true,
                    content = @Content(schema = @Schema(implementation = CollectionCreateDTO.class)))
            CollectionCreateDTO newCollection) {

        log.info(SecurityContextHolder.getContext().getAuthentication().getName());
        collectionService.createCollection(newCollection);
    }

    @GetMapping
    @Operation(summary = "Get collections by customer ID",
            description = "Retrieve a list of collections for a given customer ID")
    public List<CollectionGetDTO> getCollectionsByCustomerId(
            @RequestParam
            @Parameter(description = "UUID of the customer", name = "customer_id", required = true, example = "12345")
            String customer_id,

            @RequestParam(required = false, defaultValue = "ALL")
            @Parameter(description = "Privacy filter", name = "privacy", required = false, example = "all",
                    schema = @Schema(type = "string", allowableValues = {"all", "public", "private"}))
            Privacy privacy) {

        log.info("Privacy: {}", privacy);
        return collectionService.getCollectionsByCustomerId(customer_id, privacy);
    }

    @GetMapping("/{collection_id}")
    @Operation(summary = "Get collection by collection ID",
            description = "Retrieve a specific collection based on its ID")
    public CollectionGetDTO getCollectionByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection to be retrieved", name = "collectionId" , required = true, example = "789")
            Long collection_id) {

        return collectionService.getCustomerCollectionByCollectionId(collection_id);
    }
}