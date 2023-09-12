package ru.vesuvian.collection.service;

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
import ru.vesuvian.collection.mapping.CollectionCreateMapper;
import ru.vesuvian.collection.mapping.CollectionGetMapper;
import ru.vesuvian.collection.mapping.CollectionUpdateMapper;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.repository.CustomerCollectionRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CollectionService {
    private final CollectionRepository collectionRepository;
    private final CollectionCreateMapper collectionCreateMapper;
    private final CustomerCollectionRepository customerCollectionRepository;
    private final CollectionGetMapper collectionGetMapper;
    private final AuthenticatedCustomerResolver authenticatedCustomerResolver;
    private final PrivacyService privacyService;
    private final CollectionAccessService collectionAccessService;
    private final CollectionUpdateMapper collectionUpdateMapper;

    @Transactional
    public void createCollection(CollectionCreateDto collectionCreateDTO) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionCreateMapper.toEntity(collectionCreateDTO, customerUUID);

        collection = collectionRepository.save(collection);

        // Создаем и сохраняем CustomerCollection
        var customerCollection = CustomerCollection.builder()
                .collectionId(collection.getCollectionId())
                .customerId(collection.getCreatorCustomerId())
                .build();

        customerCollectionRepository.save(customerCollection);
    }

    public List<CollectionGetDto> getAnyCollectionsByCustomerId(String customerId, Privacy privacy) {
        List<CustomerCollection> customerCollections = customerCollectionRepository.findByCustomerIdWithCollections(customerId);
        return customerCollections.stream()
                .map(customerCollection -> collectionGetMapper.mapToDTO(customerCollection.getCollection()))
                .filter(collectionGetDTO -> privacyService.isCollectionVisibleBasedOnPrivacy(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());
    }

    public CollectionGetDto getMyCollectionById(Long collectionId) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        CustomerCollection customerCollection = customerCollectionRepository
                .findByCustomerIdAndCollectionId(customerUUID, collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        return collectionGetMapper.mapToDTO(customerCollection.getCollection());
    }

    public List<CollectionGetDto> getMyCollections(Privacy privacy) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        List<CustomerCollection> customerCollections = customerCollectionRepository.findByCustomerIdWithCollections(customerUUID);
        return customerCollections.stream()
                .map(customerCollection -> collectionGetMapper.mapToDTO(customerCollection.getCollection()))
                .filter(collectionGetDTO -> privacyService.isCollectionVisibleBasedOnPrivacy(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());

    }

    @Transactional
    public void updateCollectionById(Long collectionId, CollectionUpdateDto collectionUpdateDto) {
        String customerUUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findMyCollectionByIdAndCustomerId(collectionId, customerUUID, false);

        collectionUpdateMapper.copyAttributes(collection, collectionUpdateDto);
        collectionRepository.save(collection);
    }
}
