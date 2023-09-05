package ru.vesuvian.collection.dto.get;


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
        name = "TagGetDto",
        description = "Tag object"
)
public class TagGetDto {

    @Schema(description = "Tag ID")
    @JsonProperty("id")
    private Long tagId;

    @Schema(description = "Tag name")
    @JsonProperty("name")
    private String tagName;
}
