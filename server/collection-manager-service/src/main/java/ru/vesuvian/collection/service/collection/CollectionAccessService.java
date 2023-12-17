package ru.vesuvian.collection.service.collection;

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

    public Collection findCollection(Long collectionId, String UUID) {
        var collection = findCollectionById(collectionId);
        validateCollectionAccess(collection, UUID);
        return collection;
    }

    public Collection findCollectionWithTags(Long collectionId, String UUID) {
        var collection = findCollectionWithTagsByCollectionId(collectionId);
        validateCollectionAccess(collection, UUID);
        return collection;
    }

    public Collection findCollectionWithCard(Long collectionId, String UUID, Long cardId) {
        var collection = findCollectionWithCardByCollectionIdAndCardId(collectionId, cardId);
        validateCollectionAccess(collection, UUID);
        return collection;
    }

    private Collection findCollectionWithTagsByCollectionId(Long collectionId) {
        return collectionRepository.findByIdWithTags(collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }

    private Collection findCollectionById(Long collectionId) {
        return collectionRepository.findById(collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }

    private Collection findCollectionWithCardByCollectionIdAndCardId(Long collectionId, Long cardId) {
        return collectionRepository.findByIdWithCards(collectionId, cardId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID: " + collectionId + " and card ID: " + cardId + " not found"));
    }

    private void validateCollectionAccess(Collection collection, String customerId) {
        if (!collection.getCreatorCustomerId().equals(customerId)) {
            throw new UnauthorizedAccessException("The customer does not have permission to access this collection");
        }
    }
}



