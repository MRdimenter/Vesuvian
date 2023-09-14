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

    public Collection findMyCollectionByIdAndCustomerId(Long collectionId, String customerId) {
        return findMyCollectionByIdAndCustomerId(collectionId, customerId, false);
    }


    //TODO отрефакторить метод
    public Collection findMyCollectionByIdAndCustomerId(Long collectionId, String customerId, boolean fetchTags) {
        Collection collection;
        if (fetchTags) {
            collection = collectionRepository.findByIdWithTags(collectionId)
                    .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
        } else {
            collection = collectionRepository.findById(collectionId)
                    .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
        }

        //TODO поправить исключение, может быть выброшено и при создании карточек и при обновлении коллекции
        if (!collection.getCreatorCustomerId().equals(customerId)) {
            throw new UnauthorizedAccessException("The customer does not have permission to add cards to this collection");
        }

        return collection;
    }
}



