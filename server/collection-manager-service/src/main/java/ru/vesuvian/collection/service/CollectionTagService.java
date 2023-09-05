package ru.vesuvian.collection.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CollectionTag;
import ru.vesuvian.collection.entity.Tag;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CollectionTagService {

    public CollectionTag createCollectionTag(Collection collection, Tag tag) {
        return CollectionTag.builder()
                .collection(collection)
                .tag(tag)
                .build();
    }

    public Set<Long> getExistingTagIdsInCollection(Collection collection) {
        return collection.getCollectionTags().stream()
                .map(collectionTag -> collectionTag.getTag().getTagId())
                .collect(Collectors.toSet());
    }

    public boolean tagAlreadyExistsInCollection(Collection collection, Tag tag) {
        Set<Long> existingTagIds = getExistingTagIdsInCollection(collection);
        return existingTagIds.contains(tag.getTagId());
    }
}
