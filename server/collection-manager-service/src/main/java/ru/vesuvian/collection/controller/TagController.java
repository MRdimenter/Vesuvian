package ru.vesuvian.collection.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.service.TagService;

@RestController
@RequestMapping("api/v1/{collectionId}/tags")
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
            @ApiResponse(responseCode = "500", description = "Server error")
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
}