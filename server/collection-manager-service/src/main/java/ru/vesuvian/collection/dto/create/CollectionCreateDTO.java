package ru.vesuvian.collection.dto.create;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionCreateDTO {
//    private String creatorCustomerId;
    private String collectionName;
    private Boolean isPublic;
    private String description;
    private List<CardCreateDTO> cards;
    private Set<String> tags;
}