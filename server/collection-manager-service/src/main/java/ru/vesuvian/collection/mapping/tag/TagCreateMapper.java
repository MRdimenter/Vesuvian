package ru.vesuvian.collection.mapping.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.create.CollectionCreateDto;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CollectionTag;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.properties.TagProperties;
import ru.vesuvian.collection.repository.TagRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TagCreateMapper {
    private final TagRepository tagRepository;
    private final TagProperties tagProperties;

    public Tag toTagEntity(TagCreateDto dto) {
        return tagRepository.findByNameExcludingCollections(dto.getTagName()).orElseGet(() -> {
            Tag newTag = new Tag();
            newTag.setName(dto.getTagName());
            return tagRepository.save(newTag);
        });
    }

    public void addTagsToCollectionEntity(Collection collection, CollectionCreateDto collectionCreateDto) {
        if (isTagsInCollection(collectionCreateDto)) {
            var tags = mapCollectionDtoToEntitySetTag(collectionCreateDto);
            var collectionTags = mapTagsWithCollectionToCollectionTags(collection, tags);
            collection.setCollectionTags(collectionTags);
        }
    }

    private boolean isTagsInCollection(CollectionCreateDto collectionCreateDto) {
        return collectionCreateDto.getTags() != null && !collectionCreateDto.getTags().isEmpty();
    }

    private Set<Tag> mapCollectionDtoToEntitySetTag(CollectionCreateDto collectionCreateDto) {
        return collectionCreateDto.getTags().stream()
                .limit(tagProperties.getMaxTagsInCollection())
                .map(this::toTagEntity)
                .collect(Collectors.toSet());
    }

    private Set<CollectionTag> mapTagsWithCollectionToCollectionTags(Collection collection, Set<Tag> tags) {
        return tags.stream().map(tag -> {
            var collectionTag = new CollectionTag();
            collectionTag.setCollection(collection);
            collectionTag.setTag(tag);
            return collectionTag;
        }).collect(Collectors.toSet());
    }
}

