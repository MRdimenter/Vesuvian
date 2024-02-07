package ru.vesuvian.collection.service.tag;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.dto.get.TagGetDto;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.exception.TagNotFoundException;
import ru.vesuvian.collection.mapping.tag.TagGetMapper;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.CollectionTagRepository;
import ru.vesuvian.collection.repository.TagRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;
import ru.vesuvian.collection.service.collection.CollectionAccessService;
import ru.vesuvian.collection.service.collection.CollectionTagService;
import ru.vesuvian.collection.validation.TagValidator;

import java.util.List;
import java.util.UUID;

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
    private final TagValidator validator;

    @Transactional
    public void createTagByCollectionId(Long collectionId, TagCreateDto tagCreateDto) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollectionWithTags(collectionId, uuid);
        validator.validate(collection, tagCreateDto);
        var tag = findOrCreateTag(tagCreateDto.getTagName());
        var collectionTag = collectionTagService.createCollectionTag(collection, tag);
        collection.getCollectionTags().add(collectionTag);
        collectionRepository.save(collection);
    }

    private Tag findOrCreateTag(String name) {
        return tagRepository.findByNameExcludingCollections(name).orElseGet(() -> {
            var tag = Tag.builder().name(name).build();
            tagRepository.save(tag);
            return tag;
        });
    }

    public List<TagGetDto> getTagByCollectionId(Long collectionId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var tagList = retrieveTagsByCollectionIdAndCustomerId(collectionId, uuid);
        return tagList.stream()
                .map(tag -> tagGetMapper.mapTagToDto(tag, collectionId))
                .toList();
    }

    public void deleteTagByCollectionIdAndTagId(Long collectionId, Integer tagId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        tagRepository.findTagByCustomerIdAndCollectionIdAndTagId(collectionId, uuid, tagId)
                .orElseThrow(() -> new TagNotFoundException("Tag with ID " + tagId + " not found"));

        collectionTagRepository.deleteByCollectionIdAndTagId(collectionId, tagId);
    }

    private List<Tag> retrieveTagsByCollectionIdAndCustomerId(Long collectionId, UUID customerId) {
        return tagRepository.findTagsByCustomerIdAndCollectionId(collectionId, customerId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }
}



