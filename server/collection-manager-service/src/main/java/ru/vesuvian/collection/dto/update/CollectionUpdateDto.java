package ru.vesuvian.collection.dto.update;

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
        name = "CollectionGetDto",
        description = "Collection object"
)
public class CollectionUpdateDto {

    @Schema(description = "Collection name")
    @JsonProperty("name")
    private String collectionName;

    @Schema(description = "Is the collection public")
    @JsonProperty("is_public")
    private Boolean isPublic;

    @Schema(description = "Collection description")
    @JsonProperty("description")
    private String description;

}