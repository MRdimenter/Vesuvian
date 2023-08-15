package ru.vesuvian.collection.service;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CollectionCreateDTO;
import ru.vesuvian.collection.dto.get.CollectionGetDTO;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CustomerCollection;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.mapping.CollectionCreateMapper;
import ru.vesuvian.collection.mapping.CollectionGetMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.CustomerCollectionRepository;
import ru.vesuvian.collection.repository.TagRepository;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CollectionService {
    private final CollectionRepository collectionRepository;
    private final CardRepository cardRepository;
    private final CollectionCreateMapper collectionCreateMapper;
    private final CustomerCollectionRepository customerCollectionRepository;
    private final CollectionGetMapper collectionGetMapper;
    private final TagRepository tagRepository;

//    @Transactional
//    public void createCollection(Collection newCollection) {
//        for (Card card : newCollection.getCards()) {
//            card.setCollection(newCollection);
//        }
//
//        collectionRepository.save(newCollection);
//    }

    @Transactional
    public void createCollection(CollectionCreateDTO collectionCreateDTO) {
        Collection collection = collectionCreateMapper.toEntity(collectionCreateDTO);
        log.info(collection.toString());

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
        CustomerCollection customerCollection = CustomerCollection
                .builder()
                .collectionId(collection.getCollectionId())
                .customerId(collection.getCreatorCustomerId())
                .build();


        customerCollectionRepository.save(customerCollection);
    }


    public List<CollectionGetDTO> getCollectionsByCustomerId(String customerId, Privacy privacy) {

        List<CustomerCollection> customerCollections = customerCollectionRepository.findByCustomerIdWithCollections(customerId);
        return customerCollections.stream()
                .map(customerCollection -> collectionGetMapper.mapToDTO(customerCollection.getCollection()))
                .filter(collectionGetDTO -> filterPrivacySetting(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());


    }

    private boolean filterPrivacySetting(Privacy privacy, boolean value) {
        return switch (privacy) {
            case ALL -> true;
            case PUBLIC -> value;
            case PRIVATE -> !value;
        };
    }

    public CollectionGetDTO getCustomerCollectionByCollectionId(Long collectionId) {
        CustomerCollection customerCollection = customerCollectionRepository.
                findByCustomerIdAndCollectionId(
                        "some-customer-idыфс", // TODO заменить на UUID из Keycloak
                        collectionId
                )
                .get();

        return collectionGetMapper.mapToDTO(customerCollection.getCollection());

    }


//      public Card getCard(Long collectionID) {
//        return cardRepository.findById(collectionID).get();
//    }
}
