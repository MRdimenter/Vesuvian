package ru.vesuvian.collection.service.collection;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CollectionTag;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.exception.TagAlreadyExistsInCollectionException;

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

    public Set<Integer> getExistingTagIdsInCollection(Collection collection) {
        return collection.getCollectionTags().stream()
                .map(collectionTag -> collectionTag.getTag().getId())
                .collect(Collectors.toSet());
    }

    public void validateTagNotInCollection(Collection collection, Tag tag) {
        Set<Integer> existingTagIds = getExistingTagIdsInCollection(collection);
        if (existingTagIds.contains(tag.getId())) {
            throw new TagAlreadyExistsInCollectionException("Tag already exists in the collection.");
        }
    }
}
