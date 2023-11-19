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
        description = "Card response object"
)
public class CardListGetDto {
    @Schema(description = "Collection ID")
    @JsonProperty("collection_id")
    private Long collectionId;
    @Schema(description = "Cards")
    @JsonProperty("cards")
    private List<CardGetDto> cards;
}
