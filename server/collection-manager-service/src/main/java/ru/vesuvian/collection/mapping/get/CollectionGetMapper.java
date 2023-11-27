package ru.vesuvian.collection.mapping.get;


import lombok.RequiredArgsConstructor;
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

    public CollectionGetDto mapToDto(Collection collection, boolean isFavorite) {
        return CollectionGetDto.builder()
                .collectionId(collection.getId())
                .collectionName(collection.getName())
                .creatorCustomerId(collection.getCreatorCustomerId())
                .description(collection.getDescription())
                .isPublic(collection.getIsPublic())
                .modifiedDate(collection.getModifiedDate())
                .numberOfCards(collection.getNumberOfCards())
                .rating(collection.getRating())
                .createdAt(collection.getCreatedAt())
                .tagGetDtoList(collection.getCollectionTags()
                        .stream()
                        .map(collectionTag -> mapToTag(collectionTag.getTag(), collection.getId()))
                        .collect(Collectors.toList())
                )
                .isFavorite(isFavorite)
                .build();
    }

    public TagGetDto mapToTag(Tag tag, Long collectionId) {
        return TagGetDto.builder()
                .collectionId(collectionId)
                .tagId(tag.getId())
                .tagName(tag.getName())
                .build();
    }


}
