package ru.vesuvian.collection.service.collection;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.CollectionDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CustomerFavoriteCollection;
import ru.vesuvian.collection.exception.CollectionAlreadyFavoriteException;
import ru.vesuvian.collection.repository.CustomerFavoriteCollectionRepository;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoriteCollectionService {
    private final CustomerFavoriteCollectionRepository customerFavoriteCollectionRepository;

    public void handleFavoriteStatusUpdate(String customerId, Collection collection, CollectionDto collectionDto) {
        var isFavorite = collectionDto.getIsFavorite();

        if (isFavorite == null) {
            return;
        }

        if (!isFavorite) {
            delete(customerId, collection.getId());
            return;
        }

        addCollectionToFavoritesIfAbsent(customerId, collection);
    }

    private void save(String customerId, Collection collection) {
        CustomerFavoriteCollection customerFavoriteCollection = CustomerFavoriteCollection.builder()
                .customerId(customerId)
                .collection(collection)
                .build();

        customerFavoriteCollectionRepository.save(customerFavoriteCollection);
    }

    public void delete(String customerId, Long collectionId) {
        customerFavoriteCollectionRepository.deleteByCustomerIdAndCollectionId(customerId, collectionId);
    }

    private void addCollectionToFavoritesIfAbsent(String customerId, Collection collection) {
        Long collectionId = collection.getId();
        if (!isCollectionFavorite(customerId, collectionId)) {
            save(customerId, collection);
        } else {
            throw new CollectionAlreadyFavoriteException("The collection is already in your favorites");
        }
    }

    public Set<Long> getCollectionIds(String customerId) {
        return new HashSet<>(customerFavoriteCollectionRepository.findFavoriteCollectionIdsByCustomerId(customerId));
    }

    public boolean isCollectionFavorite(String customerId, Long collectionId) {
        return customerFavoriteCollectionRepository.existsByCustomerIdAndCollectionId(customerId, collectionId);
    }
}
