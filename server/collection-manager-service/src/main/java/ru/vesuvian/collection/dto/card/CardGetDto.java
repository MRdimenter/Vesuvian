package ru.vesuvian.collection.dto.card;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CardGetDto",
        description = "This object represents the card entity"
)
public class CardGetDto {
    @Schema(description = "The ID of the collection to which this card belongs. This links the card to its parent collection.")
    @JsonProperty("collection_id")
    private Long collectionID;

    @Schema(description = "Unique identifier for the card. It is used to reference the card individually within the system.")
    @JsonProperty("card_id")
    private Long cardId;

    @Schema(description = "The term or concept that the card is focused on. This is typically the key idea or question the card is addressing.")
    @JsonProperty("term")
    private String term;

    @Schema(description = "The definition or explanation of the term. This provides the answer or detailed information related to the term on the card.")
    @JsonProperty("definition")
    private String definition;

    @Schema(description = "An optional hint to assist in understanding or memorizing the term. This can be a mnemonic, related fact, or any helpful tip.")
    @JsonProperty("hint")
    private String hint;

    @Schema(description = "The date and time when the card was created.")
    @JsonProperty("creation_date")
    private LocalDateTime creationDate;

    @Schema(description = "The date and time when the card was last modified.")
    @JsonProperty("modified_date")
    private LocalDateTime modifiedDate;

    @Schema(description = "URL of an image associated with the card. This can be a visual representation or supplementary material related to the card's content.")
    @JsonProperty("image_url")
    private String imageURL;

    @Schema(description = "The numerical order of the card within its collection. This defines the card's position or sequence in a series of cards.")
    @JsonProperty("order_number")
    private int orderNumber;
}
