package ru.vesuvian.collection.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.dto.get.TagGetDto;
import ru.vesuvian.collection.service.tag.TagService;

import java.util.List;

@RestController
@RequestMapping("api/v1/collections/{collectionId}/tags")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Tag", description = "Tag management API")
public class TagController {

    private final TagService tagService;

    @PostMapping
    @Operation(summary = "Create a tag for a specific collection")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tag successfully created"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Collection not found"),
            @ApiResponse(responseCode = "403", description = "Forbidden action for the user"),
            @ApiResponse(responseCode = "422", description = "Collection tag limit exceeded"),
    })
    public void createTagByCollectionId(
            @PathVariable
            @Parameter(
                    description = "ID of the collection to which the tag should be added",
                    required = true,
                    name = "collectionId")
            Long collectionId,

            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Tag to add to the collection",
                    required = true)
            @Parameter(
                    description = "Tag details to be created",
                    name = "tag")
            TagCreateDto tag
    ) {
        tagService.createTagByCollectionId(collectionId, tag);
    }

    @Operation(summary = "Get tags by collection ID",
            description = "Retrieve a specific collection based on its ID",
            responses = {
                    @ApiResponse(responseCode = "404", description = "Collection not found", content = @Content(schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "200", description = "Tag received successfully"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource", content = @Content(schema = @Schema(implementation = Void.class)))
            })
    @GetMapping
    public List<TagGetDto> getTagByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection to be retrieved",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId) {
        return tagService.getTagByCollectionId(collectionId);

    }

    @DeleteMapping("/{tagId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete tag by ID",
            description = "Removing a collection tag by collection ID and tag ID",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Tag deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Collection or tag not found"),
                    @ApiResponse(responseCode = "403", description = "Forbidden action for the user"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource")
            })
    public void deleteTagByCollectionIdAndTagId(
            @PathVariable
            @Parameter(description = "ID of the collection where tag will be delete",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId,
            @PathVariable
            @Parameter(description = "ID of the tag to be deleted",
                    name = "tagId",
                    required = true,
                    example = "2")
            Integer tagId) {
        tagService.deleteTagByCollectionIdAndTagId(collectionId, tagId);
    }
}