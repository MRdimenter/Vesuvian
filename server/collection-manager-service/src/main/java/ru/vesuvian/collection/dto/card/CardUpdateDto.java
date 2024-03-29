package ru.vesuvian.collection.dto.card;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CardUpdateDto",
        description = "This object is used to update the card"
)
public class CardUpdateDto {
    @Schema(description = "Flashcard term")
    @JsonProperty("term")
    private String term;

    @Schema(description = "Flashcard definition")
    @JsonProperty("definition")
    private String definition;

    @Schema(description = "Flashcard hint")
    @JsonProperty("hint")
    private String hint;
}
