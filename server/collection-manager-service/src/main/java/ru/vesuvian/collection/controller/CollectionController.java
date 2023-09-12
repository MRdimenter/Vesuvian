package ru.vesuvian.collection.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.CollectionCreateDto;
import ru.vesuvian.collection.dto.get.CollectionGetDto;
import ru.vesuvian.collection.dto.update.CollectionUpdateDto;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.service.CollectionService;

import java.util.List;

@RestController
@RequestMapping("api/v1/collections")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Collection", description = "Collection management API")
public class CollectionController {
    private final CollectionService collectionService;

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
                    content = @Content(schema = @Schema(implementation = CollectionCreateDto.class)))
            CollectionCreateDto newCollection) {

        collectionService.createCollection(newCollection);
    }

    @GetMapping
    @Operation(summary = "Get collections by customer ID",
            description = "Retrieve a list of collections for a given customer ID")
    public List<CollectionGetDto> getAnyCollectionsByCustomerId(
            @RequestParam
            @Parameter(description = "UUID of the customer", name = "customerId", required = true, example = "12345")
            String customerId,

            @RequestParam(required = false, defaultValue = "all")
            @Parameter(description = "Privacy filter", name = "privacy", required = false, example = "all",
                    schema = @Schema(type = "string", allowableValues = {"all", "public", "private"}))
            Privacy privacy) {

        return collectionService.getAnyCollectionsByCustomerId(customerId, privacy);
    }

    @GetMapping("/{collectionId}")
    @Operation(summary = "Get collection by collection ID",
            description = "Retrieve a specific collection based on its ID")
    public CollectionGetDto getMyCollectionById(
            @PathVariable
            @Parameter(description = "ID of the collection to be retrieved", name = "collectionId", required = true, example = "789")
            Long collectionId) {

        return collectionService.getMyCollectionById(collectionId);
    }

    @GetMapping("/me")
    public List<CollectionGetDto> getMyCollections(
            @RequestParam(required = false, defaultValue = "all")
            @Parameter(description = "Privacy filter", name = "privacy", required = false, example = "all",
                    schema = @Schema(type = "string", allowableValues = {"all", "public", "private"}))
            Privacy privacy) {
        return collectionService.getMyCollections(privacy);
    }

    @PutMapping("/{collectionId}")
    @Operation(summary = "Update collection by collection ID",
            description = "Update a specific collection based on its ID")
    public void updateCollectionById(
            @PathVariable
            @Parameter(description = "ID of the collection to be updated", name = "collectionId", required = true, example = "789")
            Long collectionId,

            @RequestBody
            @Parameter(description = "Updated collection data", required = true,
                    content = @Content(schema = @Schema(implementation = CollectionUpdateDto.class)))
            CollectionUpdateDto collectionUpdateDto) {

        collectionService.updateCollectionById(collectionId, collectionUpdateDto);
    }
}