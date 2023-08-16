package ru.vesuvian.collection.dto.create;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CollectionCreateDto",
        description = "Collection object"
)
public class CollectionCreateDto {
    @Schema(description = "Collection name")
    @JsonProperty("name")
    private String collectionName;

    @Schema(description = "Is the collection public")
    @JsonProperty("is_public")
    private Boolean isPublic;

    @Schema(description = "Collection description")
    @JsonProperty("description")
    private String description;

    @Schema(description = "Array of flashcards")
    @JsonProperty("cards")
    private List<CardCreateDto> cards;

    @Schema(description = "Array of tags")
    @JsonProperty("tags")
    private Set<String> tags;
}