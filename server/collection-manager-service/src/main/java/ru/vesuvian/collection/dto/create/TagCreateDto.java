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
        description = "Tag object"
)
public class TagCreateDto {

    @JsonProperty("name")
    private String tagName;
}
