package ru.vesuvian.collection.dto.get;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.vesuvian.collection.dto.TagDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(
        name = "TagGetDto",
        description = "This object is a collection tag"
)
public class TagGetDto implements TagDto {
    @Schema(description = "The ID of the collection associated with this tag. This field links the tag to a specific collection.")
    @JsonProperty("collection_id")
    private Long collectionId;

    @Schema(description = "Unique identifier for the tag. This ID is used to uniquely identify the tag across the system and facilitate operations like searching or categorizing.")
    @JsonProperty("id")
    private Integer tagId;

    @Schema(description = "The name of the tag. This is a descriptive label used for easy identification and categorization of the collection it is associated with.")
    @JsonProperty("name")
    private String tagName;

}
