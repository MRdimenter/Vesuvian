package ru.vesuvian.collection.dto.get;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionGetDTO {
    private Long collectionId;
    private String creatorCustomerId;
    private String collectionName;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedDate;
    private String description;
    private Double rating;
    private Integer numberOfCards;

}
