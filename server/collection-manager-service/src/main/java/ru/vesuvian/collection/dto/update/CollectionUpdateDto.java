package ru.vesuvian.collection.dto.update;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.vesuvian.collection.dto.CollectionDto;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "CollectionUpdateDto",
        description = "This object is used to update the collection"
)
public class CollectionUpdateDto implements CollectionDto {

    @Schema(description = "The name of the collection.")
    @JsonProperty("name")
    private String collectionName;

    @Schema(description = "Flag indicating whether the collection is public. If true, the collection is visible to all users. Otherwise, it is private.")
    @JsonProperty("is_public")
    private Boolean isPublic;

    @Schema(description = "A brief description of the collection.")
    @JsonProperty("description")
    private String description;

    @Schema(description = "Indicates whether the collection is marked as a favorite by the user.")
    @JsonProperty("is_favorite")
    private Boolean isFavorite;

}