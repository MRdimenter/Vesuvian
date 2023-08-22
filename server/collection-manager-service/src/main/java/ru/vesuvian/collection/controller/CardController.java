package ru.vesuvian.collection.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.service.CardService;

import java.util.List;

@RestController
@RequestMapping("api/v1/collections/{collectionId}/cards")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@Tag(name = "Card", description = "Cards management API")
public class CardController {

    final CardService cardService;

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
}