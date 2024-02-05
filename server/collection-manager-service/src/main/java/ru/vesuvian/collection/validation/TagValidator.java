package ru.vesuvian.collection.validation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.TagDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.exception.MaxTagsPerCollectionReachedException;
import ru.vesuvian.collection.exception.TagAlreadyExistsInCollectionException;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class TagValidator implements Validator<Collection, TagDto> {

    @Override
    public void validate(Collection collection) {
        validateTagLimitPerCollection(collection);
    }

    @Override
    public void validate(Collection collection, TagDto tag) {
        validateTagNotInCollection(collection, tag);
        validateTagLimitPerCollection(collection);
    }

    private void validateTagLimitPerCollection(Collection collection) {
        int currentTagCount = collection.getCollectionTags().size();
        if (currentTagCount >= 3) {
            throw new MaxTagsPerCollectionReachedException("Maximum 3 tags allowed per collection.");
        }
    }

    private void validateTagNotInCollection(Collection collection, TagDto tag) {
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
