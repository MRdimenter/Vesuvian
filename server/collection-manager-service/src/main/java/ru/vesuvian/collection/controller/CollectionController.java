package ru.vesuvian.collection.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.collection.CollectionCreateDto;
import ru.vesuvian.collection.dto.collection.CollectionGetDto;
import ru.vesuvian.collection.dto.card.CollectionUpdateDto;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.service.collection.CollectionService;

import java.util.List;

@RestController
@RequestMapping("api/v1/collections")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Collection", description = "Collection management API")
@Validated
public class CollectionController {
    private final CollectionService collectionService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new collection",
            description = "Creates a new collection based on the provided data",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Collection created successfully"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource"),
                    @ApiResponse(responseCode = "400", description = "Bad Request")
            })
    public void createCollection(
            @RequestBody
            @Parameter(description = "Collection data to be created", required = true,
                    content = @Content(schema = @Schema(implementation = CollectionCreateDto.class)))
            CollectionCreateDto newCollection) {

        collectionService.createCollection(newCollection);
    }

    @GetMapping("/{collectionId}")
    @Operation(summary = "Get collection by collection ID",
            description = "Retrieve a specific collection based on its ID",
            responses = {
                    @ApiResponse(responseCode = "404", description = "Collection not found", content = @Content(schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "200", description = "Collection received successfully"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource", content = @Content(schema = @Schema(implementation = Void.class)))
            })
    public CollectionGetDto getMyCollectionById(
            @PathVariable
            @Positive(message = "Collection ID must be a positive")
            @Parameter(description = "ID of the collection to be retrieved",
                    name = "collectionId",
                    required = true,
                    example = "2",
                    content = @Content(schema = @Schema(implementation = CollectionGetDto.class)))
            Long collectionId) {

        return collectionService.getMyCollectionById(collectionId);
    }

    @GetMapping("/me")
    @Operation(summary = "Get user's collections",
            description = "Returns all user collections",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Collection received successfully"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource", content = @Content(schema = @Schema(implementation = Void.class)))
            })
    public List<CollectionGetDto> getMyCollections(
            @RequestParam(required = false, defaultValue = "all")
            @Parameter(description = "Collection privacy status filter", name = "privacy", required = false, example = "all",
                    schema = @Schema(type = "string", allowableValues = {"all", "public", "private"}))
            Privacy privacy
    ) {
        return collectionService.getMyCollections(privacy);
    }

    @PutMapping("/{collectionId}")
    @Operation(summary = "Update collection by collection ID",
            description = "Update a specific collection based on its ID",
            responses = {
                    @ApiResponse(responseCode = "404", description = "Collection not found"),
                    @ApiResponse(responseCode = "200", description = "Collection successfully updated"),
                    @ApiResponse(responseCode = "409", description = "The collection is already in your favorites"),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource")
            })
    public void updateCollectionById(
            @PathVariable
            @Positive(message = "Collection ID must be a positive")
            @Parameter(description = "ID of the collection to be updated", name = "collectionId", required = true, example = "700")
            Long collectionId,

            @RequestBody
            @Parameter(description = "Updated collection data", required = true,
                    content = @Content(schema = @Schema(implementation = CollectionUpdateDto.class)))
            CollectionUpdateDto collectionUpdateDto) {

        collectionService.updateCollectionById(collectionId, collectionUpdateDto);
    }

    @PatchMapping("/{collectionId}")
    @Operation(summary = "Partially update collection by collection ID",
            description = "Update specific attributes of a collection based on its ID",
            responses = {
                    @ApiResponse(responseCode = "404", description = "Collection not found"),
                    @ApiResponse(responseCode = "200", description = "Collection successfully updated"),
                    @ApiResponse(responseCode = "409", description = "The collection is already in your favorites"),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource")
            }
    )
    public void updateCollectionPartiallyById(
            @PathVariable
            @Parameter(description = "ID of the collection to be updated", name = "collectionId", required = true, example = "789")
            @Positive(message = "Collection ID must be a positive")
            Long collectionId,
            @RequestBody
            @Parameter(description = "Updated collection data with only the fields that need to be updated", required = true,
                    content = @Content(schema = @Schema(implementation = CollectionUpdateDto.class)))
            CollectionUpdateDto collectionUpdateDto) {

        collectionService.updateCollectionPartiallyById(collectionId, collectionUpdateDto);
    }


    @DeleteMapping("/{collectionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete collection by ID",
            description = "Deletes a specific collection based on its ID. Only the owner of the collection can delete it.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Collection deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Collection not found"),
                    @ApiResponse(responseCode = "403", description = "Forbidden action for the user"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource")
            })
    public void deleteCollectionById(
            @PathVariable
            @Positive(message = "Collection ID must be a positive")
            @Parameter(name = "collectionId", description = "ID of the collection to be deleted", required = true, example = "789")
            Long collectionId) {
        collectionService.deleteCollectionById(collectionId);
    }
}