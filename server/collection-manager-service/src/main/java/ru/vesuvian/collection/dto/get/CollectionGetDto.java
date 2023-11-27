package ru.vesuvian.collection.dto.get;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.vesuvian.collection.dto.CollectionDto;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CollectionGetDto",
        description = "Collection object"
)
public class CollectionGetDto implements CollectionDto {

    @Schema(description = "Collection ID")
    @JsonProperty("collection_id")
    private Long collectionId;

    @Schema(description = "Collection creator ID")
    @JsonProperty("collection_creator")
    private String creatorCustomerId;

    @Schema(description = "Collection name")
    @JsonProperty("name")
    private String collectionName;

    @Schema(description = "Is the collection public")
    @JsonProperty("is_public")
    private Boolean isPublic;

    @Schema(description = "Is the collection a favorite")
    @JsonProperty("is_favorite")
    private Boolean isFavorite;

    @Schema(description = "Collection creation date")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Schema(description = "The date the collection was last modified")
    @JsonProperty("modified_date")
    private LocalDateTime modifiedDate;

    @Schema(description = "Collection description")
    @JsonProperty("description")
    private String description;

    @Schema(description = "Collection rating")
    @JsonProperty("rating")
    private Double rating;

    @Schema(description = "Number of cards in the collection")
    @JsonProperty("number_of_cards")
    private Integer numberOfCards;

    @JsonProperty("tags")
    private List<TagGetDto> tagGetDtoList;


}
