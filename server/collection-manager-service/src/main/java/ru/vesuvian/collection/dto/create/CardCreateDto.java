package ru.vesuvian.collection.dto.create;

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
        name = "CardCreateDto",
        description = "Card  object"
)
public class CardCreateDto {
    @Schema(description = "Flashcard term")
    @JsonProperty("term")
    private String term;

    @Schema(description = "Flashcard definition")
    @JsonProperty("definition")
    private String definition;

    @Schema(description = "Flashcard hint")
    @JsonProperty("hint")
    private String hint;

    @Schema(description = "image url")
    @JsonProperty("image_url")
    private String imageURL;
}
