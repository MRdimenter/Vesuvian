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
        name = "TagCreateDto",
        description = "This is an object designed to create a tag"
)
public class TagCreateDto {
    @Schema(description = "The name of the tag. This is a descriptive label used for easy identification and categorization of the collection it is associated with.")
    @JsonProperty("name")
    private String tagName;
}
