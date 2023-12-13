package ru.vesuvian.collection.dto.get;

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
        description = "This object represents a collection entity, encapsulating all relevant details about a collection including its ID, creator, and attributes such as name, visibility, and status."
)
public class CollectionGetDto implements CollectionDto {

    @Schema(description = "Unique identifier for the collection. It is used to reference the collection across the system.")
    @JsonProperty("collection_id")
    private Long collectionId;

    @Schema(description = "ID of the collection creator. Created automatically when registering with Keycloak")
    @JsonProperty("collection_creator")
    private String creatorCustomerId;

    @Schema(description = "The name of the collection.")
    @JsonProperty("name")
    private String collectionName;

    @Schema(description = "Flag indicating whether the collection is public. If true, the collection is visible to all users. Otherwise, it is private.")
    @JsonProperty("is_public")
    private Boolean isPublic;

    @Schema(description = "Indicates whether the collection is marked as a favorite by the user.")
    @JsonProperty("is_favorite")
    private Boolean isFavorite;

    @Schema(description = "The date and time when the collection was created.")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Schema(description = "The date and time when the collection was last modified.")
    @JsonProperty("modified_date")
    private LocalDateTime modifiedDate;

    @Schema(description = "A brief description of the collection.")
    @JsonProperty("description")
    private String description;

    @Schema(description = "Numerical ranking of the collection. Not yet in use.")
    @JsonProperty("rating")
    private Double rating;

    @Schema(description = "The total number of cards in the collection.")
    @JsonProperty("number_of_cards")
    private Integer numberOfCards;

    @Schema(description = "A list of tags associated with the collection. Tags are keywords or labels that help in categorizing or describing the collection.")
    @JsonProperty("tags")
    private List<TagGetDto> tagGetDtoList;
}
