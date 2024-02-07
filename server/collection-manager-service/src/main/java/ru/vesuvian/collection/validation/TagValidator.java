package ru.vesuvian.collection.validation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.TagDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.exception.tag.MaxTagsPerCollectionReachedException;
import ru.vesuvian.collection.exception.tag.TagAlreadyExistsInCollectionException;
import ru.vesuvian.collection.properties.TagProperties;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class TagValidator implements Validator<Collection, TagDto> {
    private final TagProperties tagProperties;

    @Override
    public void validate(Collection collection) {
        validateTagLimitPerCollection(collection);
    }

    @Override
    public void validate(Collection collection, TagDto tag) {
        validateTagExistInCollection(collection, tag);
        validateTagLimitPerCollection(collection);
    }

    private void validateTagLimitPerCollection(Collection collection) {
        int currentTagCount = collection.getCollectionTags().size();
        if (currentTagCount > tagProperties.getMaxTagsInCollection()) {
            throw new MaxTagsPerCollectionReachedException(
                    String.format(
                            "Maximum %d tags allowed per collection.",
                            tagProperties.getMaxTagsInCollection()
                    )
            );
        }
    }

    private void validateTagExistInCollection(Collection collection, TagDto tag) {
        Set<String> existingTagIds = getExistingTagsNameInCollection(collection);
        if (existingTagIds.contains(tag.getTagName())) {
            throw new TagAlreadyExistsInCollectionException("Tag already exists in the collection.");
        }
    }

    private Set<String> getExistingTagsNameInCollection(Collection collection) {
        return collection.getCollectionTags().stream()
                .map(collectionTag -> collectionTag.getTag().getName())
                .collect(Collectors.toSet());
    }
}
