package ru.vesuvian.collection.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.dto.get.CardListGetDto;
import ru.vesuvian.collection.dto.update.CardUpdateDto;
import ru.vesuvian.collection.service.card.CardService;

@RestController
@RequestMapping("api/v1/collections/{collectionId}/cards")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Card", description = "Cards management API")
public class CardController {
    private final CardService cardService;

    @GetMapping
    @Operation(summary = "Get cards by collection ID",
            description = "Get cards based on collection ID",
            responses = {
                    @ApiResponse(responseCode = "404", description = "Collection or card not found", content = @Content(schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "200", description = "Cards received successfully"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource", content = @Content(schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "403", description = "Forbidden action for the user", content = @Content(schema = @Schema(implementation = Void.class))),
            })
    public CardListGetDto getCardsByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection to be retrieved",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId) {
        return cardService.getCardsByCollectionId(collectionId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new card",
            description = "Creates a new card based on the provided data",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Card created successfully"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource"),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "404", description = "Collection or card not found", content = @Content(schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "403", description = "Forbidden action for the user"),
            })
    public void createCardByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection where card will be added",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId,
            @RequestBody
            @Parameter(description = "Card data to be created", required = true)
            CardCreateDto cardCreateDto
    ) {

        cardService.createCardByCollectionId(collectionId, cardCreateDto);

    }

    @PatchMapping("/{cardId}")
    @Operation(summary = "Partially update card by collection ID and card Id",
            description = "Update specific attributes of a card based on its ID",
            responses = {
                    @ApiResponse(responseCode = "404", description = "Collection or card not found"),
                    @ApiResponse(responseCode = "200", description = "Card successfully updated"),
                    @ApiResponse(responseCode = "400", description = "Bad Request"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource"),
                    @ApiResponse(responseCode = "403", description = "Forbidden action for the user"),
            }
    )
    public void updateCardPartiallyByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection where card will be updated",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId,
            @PathVariable
            @Parameter(description = "ID of the card to be updated",
                    name = "cardId",
                    required = true,
                    example = "2")
            Long cardId,
            @RequestBody
            @Parameter(description = "Updated card data", required = true)
            CardUpdateDto cardUpdateDto
    ) {
        cardService.updateCardByCollectionIdAndCardId(collectionId, cardId, cardUpdateDto);
    }

    @DeleteMapping("/{cardId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete card by ID",
            description = "Removing a collection card by collection ID and card ID",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Card deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Collection or card not found"),
                    @ApiResponse(responseCode = "403", description = "Forbidden action for the user"),
                    @ApiResponse(responseCode = "401", description = "Full authentication is required to access this resource")
            })
    public void deleteCardByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection where card will be delete",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId,
            @PathVariable
            @Parameter(description = "ID of the card to be deleted",
                    name = "cardId",
                    required = true,
                    example = "2")
            Long cardId) {
        cardService.deleteCardByCollectionIdAndCardId(collectionId, cardId);
    }
}