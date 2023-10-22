package ru.vesuvian.collection.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.dto.update.CardUpdateDto;
import ru.vesuvian.collection.service.CardService;

import java.util.List;

@RestController
@RequestMapping("api/v1/collections/{collectionId}/cards")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Card", description = "Cards management API")
public class CardController {
    private final CardService cardService;

    @GetMapping
    public List<CardGetDto> getCardsByCollectionId(
            @PathVariable
            @Parameter(description = "ID of the collection to be retrieved",
                    name = "collectionId",
                    required = true,
                    example = "1")
            Long collectionId) {
        return cardService.getCardsByCollectionId(collectionId);
    }

    @PostMapping
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

    @PutMapping("/{cardId}")
    public void updateCardByCollectionIdAndCardId(
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
    public void deleteCardByCollectionIdAndCardId(
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