package ru.vesuvian.collection.service.tag;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.dto.get.TagGetDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.exception.MaxTagsPerCollectionReachedException;
import ru.vesuvian.collection.exception.TagNotFoundException;
import ru.vesuvian.collection.mapping.get.TagGetMapper;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.CollectionTagRepository;
import ru.vesuvian.collection.repository.TagRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;
import ru.vesuvian.collection.service.collection.CollectionAccessService;
import ru.vesuvian.collection.service.collection.CollectionTagService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagService {
    private final TagRepository tagRepository;
    private final CollectionAccessService collectionAccessService;
    private final AuthenticatedCustomerResolver authenticatedCustomerResolver;
    private final CollectionTagService collectionTagService;
    private final CollectionRepository collectionRepository;
    private final CollectionTagRepository collectionTagRepository;
    private final TagGetMapper tagGetMapper;


    @Transactional
    public void createTagByCollectionId(Long collectionId, TagCreateDto tagCreateDto) {
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollectionWithTags(collectionId, customerId);

        validateTagLimitPerCollection(collection);

        var tag = findOrCreateTag(tagCreateDto.getTagName());
        collectionTagService.validateTagNotInCollection(collection, tag);

        var collectionTag = collectionTagService.createCollectionTag(collection, tag);
        collection.getCollectionTags().add(collectionTag);
        collectionRepository.save(collection);
    }

    private Tag findOrCreateTag(String tagName) {
        return tagRepository.findByNameExcludingCollections(tagName).orElseGet(() -> {
            var tag = Tag.builder().name(tagName).build();
            tagRepository.save(tag);
            return tag;
        });
    }

    public List<TagGetDto> getTagByCollectionId(Long collectionId) {
        var customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var tagList = retrieveTagsByCollectionIdAndCustomerId(collectionId, customerId);
        return tagList.stream()
                .map(tag -> tagGetMapper.mapTagToDto(tag, collectionId))
                .toList();
    }

    public void deleteTagByCollectionIdAndTagId(Long collectionId, Integer tagId) {
        var customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        tagRepository.findTagByCustomerIdAndCollectionIdAndTagId(collectionId, customerId, tagId)
                .orElseThrow(() -> new TagNotFoundException("Tag with ID " + tagId + " not found"));

        collectionTagRepository.deleteByCollectionIdAndTagId(collectionId, tagId);
    }

    private List<Tag> retrieveTagsByCollectionIdAndCustomerId(Long collectionId, String customerId) {
        return tagRepository.findTagsByCustomerIdAndCollectionId(collectionId, customerId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }

    private void validateTagLimitPerCollection(Collection collection) {
        int currentTagCount = collection.getCollectionTags().size();
        if (currentTagCount >= 3) {
            throw new MaxTagsPerCollectionReachedException("Maximum 3 tags allowed per collection.");
        }
    }
}



