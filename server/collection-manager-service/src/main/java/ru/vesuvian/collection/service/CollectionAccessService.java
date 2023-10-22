package ru.vesuvian.collection.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.exception.UnauthorizedAccessException;
import ru.vesuvian.collection.repository.CollectionRepository;


/**
 * Service responsible for handling access to collections based on
 * user authentication. It ensures that only authenticated users can
 * access and modify their respective collections.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CollectionAccessService {
    private final CollectionRepository collectionRepository;

    public Collection findCollectionByCustomerIdAndUUID(Long collectionId, String customerId) {
        Collection collection = findCollectionById(collectionId);
        validateCollectionAccess(collection, customerId);
        return collection;
    }

    public Collection findCollectionWithTagsByCustomerIdAndUUID(Long collectionId, String customerId) {
        Collection collection = findCollectionWithTags(collectionId);
        validateCollectionAccess(collection, customerId);
        return collection;
    }

    private Collection findCollectionWithTags(Long collectionId) {
        return collectionRepository.findByIdWithTags(collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }

    private Collection findCollectionById(Long collectionId) {
        return collectionRepository.findById(collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }

    private void validateCollectionAccess(Collection collection, String customerId) {
        if (!collection.getCreatorCustomerId().equals(customerId)) {
            throw new UnauthorizedAccessException("The customer does not have permission to access this collection");
        }
    }
}



