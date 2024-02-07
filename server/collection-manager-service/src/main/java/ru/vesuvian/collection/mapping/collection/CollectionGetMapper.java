package ru.vesuvian.collection.mapping.collection;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.collection.CollectionGetDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.mapping.tag.TagGetMapper;

import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class CollectionGetMapper {
    private final TagGetMapper tagGetMapper;

    public CollectionGetDto mapToDto(Collection collection, boolean isFavorite) {
        return CollectionGetDto.builder()
                .collectionId(collection.getId())
                .collectionName(collection.getName())
                .creatorCustomerId(collection.getCreatorCustomerId().toString())
                .description(collection.getDescription())
                .isPublic(collection.getIsPublic())
                .modifiedDate(collection.getModifiedDate())
                .numberOfCards(collection.getNumberOfCards())
                .rating(collection.getRating())
                .createdAt(collection.getCreatedAt())
                .tagGetDtoList(collection.getCollectionTags()
                        .stream()
                        .map(collectionTag -> tagGetMapper.mapTagToDto(collectionTag.getTag(), collection.getId()))
                        .collect(Collectors.toList())
                )
                .isFavorite(isFavorite)
                .build();
    }
}
