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
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionCreateMapper.toEntity(collectionCreateDTO, UUID);

        collection = collectionRepository.save(collection);

        var customerCollection = CustomerCollection.builder()
                .collectionId(collection.getId())
                .customerId(collection.getCreatorCustomerId())
                .build();

        customerCollectionRepository.save(customerCollection);
        favoriteCollectionService.handleFavoriteStatusUpdate(UUID, collection, collectionCreateDTO);
    }

    public CollectionGetDto getMyCollectionById(Long collectionId) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var customerCollection = customerCollectionRepository
                .findByCustomerIdAndCollectionId(UUID, collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found"));

        var isFavorite = favoriteCollectionService.isCollectionFavorite(UUID, collectionId);
        return collectionGetMapper.mapToDto(customerCollection.getCollection(), isFavorite);
    }

    public List<CollectionGetDto> getMyCollections(Privacy privacy) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var customerCollections = customerCollectionRepository.findByCustomerId(UUID);

        var favoriteCollectionIds = favoriteCollectionService.getCollectionIds(UUID);

        return customerCollections.stream()
                .map(customerCollection ->
                        collectionGetMapper.mapToDto(customerCollection.getCollection(),
                                favoriteCollectionIds.contains(customerCollection.getCollectionId())))
                .filter(collectionGetDTO -> privacyService.isCollectionVisibleBasedOnPrivacy(privacy, collectionGetDTO.getIsPublic()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCollectionById(Long collectionId, CollectionUpdateDto collectionUpdateDto) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollection(collectionId, UUID);

        collectionUpdateMapper.updateCollectionForPut(collection, collectionUpdateDto);
        favoriteCollectionService.handleFavoriteStatusUpdate(UUID, collection, collectionUpdateDto);
        collectionRepository.save(collection);
    }

    @Transactional
    public void updateCollectionPartiallyById(Long collectionId, CollectionUpdateDto collectionUpdateDto) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollection(collectionId, UUID);

        collectionUpdateMapper.updateCollectionForPatch(collection, collectionUpdateDto);
        favoriteCollectionService.handleFavoriteStatusUpdate(UUID, collection, collectionUpdateDto);
        collectionRepository.save(collection);
    }

    @Transactional
    public void deleteCollectionById(Long collectionId) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        collectionAccessService.findCollection(collectionId, UUID);

        cardRepository.deleteByCollectionId(collectionId);
        customerCollectionRepository.deleteByCollectionId(collectionId);
        collectionTagRepository.deleteByCollectionId(collectionId);
        favoriteCollectionService.delete(UUID, collectionId);

        collectionRepository.deleteByCollectionId(collectionId);
    }


}
