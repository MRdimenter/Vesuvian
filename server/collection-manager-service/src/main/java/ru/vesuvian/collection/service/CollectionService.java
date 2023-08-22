package ru.vesuvian.collection.service;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CollectionCreateDto;
import ru.vesuvian.collection.dto.get.CollectionGetDto;
import ru.vesuvian.collection.entity.CustomerCollection;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.mapping.CollectionCreateMapper;
import ru.vesuvian.collection.mapping.CollectionGetMapper;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.CustomerCollectionRepository;
import ru.vesuvian.collection.repository.TagRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CollectionService {
    final CollectionRepository collectionRepository;
    final CollectionCreateMapper collectionCreateMapper;
    final CustomerCollectionRepository customerCollectionRepository;
    final CollectionGetMapper collectionGetMapper;
    final TagRepository tagRepository;
    final AuthenticatedCustomerResolver authenticatedCustomerResolver;


    @Transactional
    public void createCollection(CollectionCreateDto collectionCreateDTO) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionCreateMapper.toEntity(collectionCreateDTO, customerUUID);


        if (collectionCreateDTO.getTags() != null && !collectionCreateDTO.getTags().isEmpty()) {
            Set<Tag> tags = collectionCreateDTO.getTags().stream()
                    .map(tagName -> tagRepository.findByTagName(tagName)
                            .orElseGet(() -> {
                                Tag newTag = new Tag();
                                newTag.setTagName(tagName);
                                return tagRepository.save(newTag);
                            }))
                    .collect(Collectors.toSet());
            collection.setTags(tags);
        }


        collection = collectionRepository.save(collection);


        // Создаем и сохраняем CustomerCollection
        var customerCollection = CustomerCollection
                .builder()
                .collectionId(collection.getCollectionId())
                .customerId(collection.getCreatorCustomerId())
                .build();


        customerCollectionRepository.save(customerCollection);
    }


    public List<CollectionGetDto> getCollectionsByCustomerId(String customerId, Privacy privacy) {

        List<CustomerCollection> customerCollections = customerCollectionRepository.findByCustomerIdWithCollections(customerId);
        return customerCollections.stream()
                .map(customerCollection -> collectionGetMapper.mapToDTO(customerCollection.getCollection()))
                .filter(collectionGetDTO -> filterPrivacySetting(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());


    }

    //todo перенести метод в другое место
    private boolean filterPrivacySetting(Privacy privacy, boolean value) {
        return switch (privacy) {
            case ALL -> true;
            case PUBLIC -> value;
            case PRIVATE -> !value;
        };
    }

    public CollectionGetDto getCustomerCollectionByCollectionId(Long collectionId) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        CustomerCollection customerCollection = customerCollectionRepository.
                findByCustomerIdAndCollectionId(
                        customerUUID,
                        collectionId
                )
                .get();

        return collectionGetMapper.mapToDTO(customerCollection.getCollection());

    }
}
