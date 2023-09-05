package ru.vesuvian.collection.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.dto.get.TagGetDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.exception.TagAlreadyExistsInCollectionException;
import ru.vesuvian.collection.mapping.TagGetMapper;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.TagRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;

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
    private final TagGetMapper tagGetMapper;

    @Transactional
    public void createTagByCollectionId(Long collectionId, TagCreateDto tagCreateDto) {
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        Collection collection = collectionAccessService.findMyCollectionByIdAndCustomerId(collectionId, customerId, true);
        collection.setModifiedDateToNow();

        Tag tag = findOrCreateTag(tagCreateDto.getTagName());
        tagRepository.save(tag);

        if (collectionTagService.tagAlreadyExistsInCollection(collection, tag)) {
            throw new TagAlreadyExistsInCollectionException("Tag already exists in the collection.");
        }

        var collectionTag = collectionTagService.createCollectionTag(collection, tag);
        collection.getCollectionTags().add(collectionTag);
        collectionRepository.save(collection);

    }

    private Tag findOrCreateTag(String tagName) {
        return tagRepository.findByNameExcludingCollections(tagName).orElseGet(() -> {
            return Tag.builder().tagName(tagName).build();
        });
    }


    public List<TagGetDto> getTagByCollectionId(Long collectionId) {
        var customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var tagList = retrieveTagsByCollectionIdAndCustomerId(collectionId, customerId);
        return tagList.stream()
                .map(tagGetMapper::mapTagToDto)
                .toList();
    }

    private List<Tag> retrieveTagsByCollectionIdAndCustomerId(Long collectionId, String customerId) {
        return tagRepository.findTagsByCustomerIdAndCollectionId(collectionId, customerId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }
}



