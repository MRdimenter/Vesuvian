package ru.vesuvian.collection.dto.collection;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.vesuvian.collection.dto.CollectionDto;
import ru.vesuvian.collection.dto.card.CardCreateDto;
import ru.vesuvian.collection.dto.tag.TagCreateDto;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CollectionCreateDto",
        description = "This is an object designed to create a collection"
)
public class CollectionCreateDto implements CollectionDto {

    @NotNull(message = "Collection name cannot be null")
    @Schema(description = "The name of the collection.")
    @JsonProperty("name")
    private String collectionName;

    @Schema(description = "Flag indicating whether the collection is public. If true, the collection is visible to all users. Otherwise, it is private.")
    @JsonProperty("is_public")
    private Boolean isPublic;

    @Schema(description = "Indicates whether the collection is marked as a favorite by the user.")
    @JsonProperty("is_favorite")
    private Boolean isFavorite = false;

    @Schema(description = "A brief description of the collection.")
    @JsonProperty("description")
    private String description;

    @Schema(description = "List of cards belonging to this collection")
    @JsonProperty("cards")
    private List<CardCreateDto> cards;

    @Schema(description = "List of tags belonging to this collection")
    @JsonProperty("tags")
    private Set<TagCreateDto> tags;
}