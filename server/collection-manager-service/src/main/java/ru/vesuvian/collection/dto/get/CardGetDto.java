package ru.vesuvian.collection.dto.get;

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
        description = "Card object"
)
public class CardGetDto {
    @Schema(description = "Collection ID")
    @JsonProperty("collection_id")
    private Long collectionID;

    @Schema(description = "Card ID")
    @JsonProperty("card_id")
    private Long cardId;

    @Schema(description = "Flashcard term")
    @JsonProperty("term")
    private String term;

    @Schema(description = "Flashcard definition")
    @JsonProperty("definition")
    private String definition;

    @Schema(description = "Flashcard hint")
    @JsonProperty("hint")
    private String hint;

    @Schema(description = "Creation date")
    @JsonProperty("creation_date")
    private LocalDateTime creationDate;

    @Schema(description = "Modified date")
    @JsonProperty("modified_date")
    private LocalDateTime modifiedDate;

    @Schema(description = "image url")
    @JsonProperty("image_url")
    private String imageURL;
}
