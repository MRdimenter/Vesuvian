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
    private final FavoriteCollectionService favoriteCollectionService;

    @Transactional
    public void createCollection(CollectionCreateDto collectionCreateDTO) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionCreateMapper.toEntity(collectionCreateDTO, uuid);

        collection = collectionRepository.save(collection);

        var customerCollection = CustomerCollection.builder()
                .collectionId(collection.getId())
                .customerId(collection.getCreatorCustomerId())
                .build();

        customerCollectionRepository.save(customerCollection);
        favoriteCollectionService.handleFavoriteStatusUpdate(uuid, collection, collectionCreateDTO);
    }

    public CollectionGetDto getMyCollectionById(Long collectionId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var customerCollection = customerCollectionRepository
                .findByCustomerIdAndCollectionId(uuid, collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        var isFavorite = favoriteCollectionService.isCollectionFavorite(uuid, collectionId);
        return collectionGetMapper.mapToDto(customerCollection.getCollection(), isFavorite);
    }

    public List<CollectionGetDto> getMyCollections(Privacy privacy) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var customerCollections = customerCollectionRepository.findByCustomerId(uuid);

        var favoriteCollectionIds = favoriteCollectionService.getCollectionIds(uuid);

        return customerCollections.stream()
                .map(customerCollection ->
                        collectionGetMapper.mapToDto(customerCollection.getCollection(),
                                favoriteCollectionIds.contains(customerCollection.getCollectionId())))
                .filter(collectionGetDTO -> privacyService.isCollectionVisibleBasedOnPrivacy(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCollectionById(Long collectionId, CollectionUpdateDto collectionUpdateDto) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollection(collectionId, uuid);

        collectionUpdateMapper.updateCollectionForPut(collection, collectionUpdateDto);
        favoriteCollectionService.handleFavoriteStatusUpdate(uuid, collection, collectionUpdateDto);
        collectionRepository.save(collection);
    }

    @Transactional
    public void updateCollectionPartiallyById(Long collectionId, CollectionUpdateDto collectionUpdateDto) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollection(collectionId, uuid);

        collectionUpdateMapper.updateCollectionForPatch(collection, collectionUpdateDto);
        favoriteCollectionService.handleFavoriteStatusUpdate(uuid, collection, collectionUpdateDto);
        collectionRepository.save(collection);
    }

    @Transactional
    public void deleteCollectionById(Long collectionId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        collectionAccessService.findCollection(collectionId, uuid);

        cardRepository.deleteByCollectionId(collectionId);
        customerCollectionRepository.deleteByCollectionId(collectionId);
        collectionTagRepository.deleteByCollectionId(collectionId);
        favoriteCollectionService.delete(uuid, collectionId);
        collectionRepository.deleteByCollectionId(collectionId);
    }
}
