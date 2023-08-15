package ru.vesuvian.collection.dto.create;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardCreateDTO {
    private String term;
    private String definition;
    private String hint;
    private String imageURL;
}
