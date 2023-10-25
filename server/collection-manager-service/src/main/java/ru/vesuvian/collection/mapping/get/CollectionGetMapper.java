package ru.vesuvian.collection.mapping.get;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.get.CollectionGetDto;
import ru.vesuvian.collection.dto.get.TagGetDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.Tag;

import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class CollectionGetMapper {

    public CollectionGetDto mapToDTO(Collection collection) {
        return CollectionGetDto.builder()
                .collectionId(collection.getCollectionId())
                .collectionName(collection.getCollectionName())
                .creatorCustomerId(collection.getCreatorCustomerId())
                .description(collection.getDescription())
                .isPublic(collection.getIsPublic())
                .modifiedDate(collection.getModifiedDate())
                .numberOfCards(collection.getNumberOfCards())
                .rating(collection.getRating())
                .createdAt(collection.getCreatedAt())
                .tagGetDtoList(collection.getCollectionTags()
                        .stream()
                        .map(collectionTag -> mapToTag(collectionTag.getTag()))
                        .collect(Collectors.toList())
                )
                .build();
    }

    public TagGetDto mapToTag(Tag tag) {
        return TagGetDto.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName())
                .build();
    }


}