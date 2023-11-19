package ru.vesuvian.collection.service.collection;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CollectionCreateDto;
import ru.vesuvian.collection.dto.get.CollectionGetDto;
import ru.vesuvian.collection.dto.update.CollectionUpdateDto;
import ru.vesuvian.collection.entity.CustomerCollection;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.mapping.create.CollectionCreateMapper;
import ru.vesuvian.collection.mapping.get.CollectionGetMapper;
import ru.vesuvian.collection.mapping.update.CollectionUpdateMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.CollectionTagRepository;
import ru.vesuvian.collection.repository.CustomerCollectionRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;
import ru.vesuvian.collection.service.PrivacyService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CollectionService {
    private final CollectionTagRepository collectionTagRepository;
    private final CollectionRepository collectionRepository;
    private final CollectionCreateMapper collectionCreateMapper;
    private final CustomerCollectionRepository customerCollectionRepository;
    private final CollectionGetMapper collectionGetMapper;
    private final AuthenticatedCustomerResolver authenticatedCustomerResolver;
    private final PrivacyService privacyService;
    private final CollectionAccessService collectionAccessService;
    private final CollectionUpdateMapper collectionUpdateMapper;
    private final CardRepository cardRepository;

    @Transactional
    public void createCollection(CollectionCreateDto collectionCreateDTO) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionCreateMapper.toEntity(collectionCreateDTO, customerUUID);

        collection = collectionRepository.save(collection);

        // Создаем и сохраняем CustomerCollection
        var customerCollection = CustomerCollection.builder()
                .collectionId(collection.getId())
                .customerId(collection.getCreatorCustomerId())
                .build();

        customerCollectionRepository.save(customerCollection);
    }

    public List<CollectionGetDto> getAnyCollectionsByCustomerId(String customerId, Privacy privacy) {
        List<CustomerCollection> customerCollections = customerCollectionRepository.findByCustomerIdWithCollections(customerId);
        return customerCollections.stream()
                .map(customerCollection -> collectionGetMapper.mapToDto(customerCollection.getCollection()))
                .filter(collectionGetDTO -> privacyService.isCollectionVisibleBasedOnPrivacy(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());
    }

    public CollectionGetDto getMyCollectionById(Long collectionId) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        CustomerCollection customerCollection = customerCollectionRepository
                .findByCustomerIdAndCollectionId(customerUUID, collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        return collectionGetMapper.mapToDto(customerCollection.getCollection());
    }

    public List<CollectionGetDto> getMyCollections(Privacy privacy) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        List<CustomerCollection> customerCollections = customerCollectionRepository.findByCustomerIdWithCollectionsAndTags(UUID);

        return customerCollections.stream()
                .map(customerCollection -> collectionGetMapper.mapToDto(customerCollection.getCollection()))
                .filter(collectionGetDTO -> privacyService.isCollectionVisibleBasedOnPrivacy(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCollectionById(Long collectionId, CollectionUpdateDto collectionUpdateDto) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollection(collectionId, UUID);

        collectionUpdateMapper.updateCollection(collection, collectionUpdateDto);
        collectionRepository.save(collection);
    }

    @Transactional
    public void deleteCollectionById(Long collectionId) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        collectionAccessService.findCollection(collectionId, UUID);

        cardRepository.deleteByCollectionId(collectionId);
        customerCollectionRepository.deleteByCollectionId(collectionId);
        collectionTagRepository.deleteByCollectionId(collectionId);
        collectionRepository.deleteByCollectionId(collectionId);
    }

}
