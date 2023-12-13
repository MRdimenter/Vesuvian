package ru.vesuvian.collection.dto.get;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CardListGetDto",
        description = "This object contains a list of cards and additional supporting information"
)
public class CardListGetDto {
    @Schema(description = "The ID of the collection that these cards belong to. This field links the list of cards to a specific collection in the system.")
    @JsonProperty("collection_id")
    private Long collectionId;

    @Schema(description = "A list of 'CardGetDto' objects. Each object in this list represents a flashcard, including its details such as card ID, term, definition, and related metadata.")
    @JsonProperty("cards")
    private List<CardGetDto> cards;
}

