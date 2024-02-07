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
        name = "CardCreateDto",
        description = "This is an object designed to create a card"
)
public class CardCreateDto {
    @Schema(description = "The term or concept that the card is focused on. This is typically the key idea or question the card is addressing.")
    @JsonProperty("term")
    private String term;

    @Schema(description = "The definition or explanation of the term. This provides the answer or detailed information related to the term on the card.")
    @JsonProperty("definition")
    private String definition;

    @Schema(description = "An optional hint to assist in understanding or memorizing the term. This can be a mnemonic, related fact, or any helpful tip.")
    @JsonProperty("hint")
    private String hint;

    @Schema(description = "URL of an image associated with the card. This can be a visual representation or supplementary material related to the card's content.")
    @JsonProperty("image_url")
    private String imageURL;
}
