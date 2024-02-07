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
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoriteCollectionService {
    private final CustomerFavoriteCollectionRepository customerFavoriteCollectionRepository;

    public void handleFavoriteStatusUpdate(UUID customerId, Collection collection, CollectionDto collectionDto, boolean isNewCollection) {
        var isFavorite = collectionDto.getIsFavorite();

        if (isFavorite == null) {
            return;
        }

        if (!isFavorite) {
            if (isNewCollection) return;
            delete(customerId, collection.getId());
            return;
        }

        addCollectionToFavoritesIfAbsent(customerId, collection);
    }

    private void save(UUID customerId, Collection collection) {
        CustomerFavoriteCollection customerFavoriteCollection = CustomerFavoriteCollection.builder()
                .customerId(customerId)
                .collection(collection)
                .build();

        customerFavoriteCollectionRepository.save(customerFavoriteCollection);
    }

    public void delete(UUID customerId, Long collectionId) {
        customerFavoriteCollectionRepository.deleteByCustomerIdAndCollectionId(customerId, collectionId);
    }

    private void addCollectionToFavoritesIfAbsent(UUID customerId, Collection collection) {
        Long collectionId = collection.getId();
        if (!isCollectionFavorite(customerId, collectionId)) {
            save(customerId, collection);
        } else {
            throw new CollectionAlreadyFavoriteException("The collection is already in your favorites");
        }
    }

    public Set<Long> getCollectionIds(UUID customerId) {
        return new HashSet<>(customerFavoriteCollectionRepository.findFavoriteCollectionIdsByCustomerId(customerId));
    }

    public boolean isCollectionFavorite(UUID uuid, Long collectionId) {
        return customerFavoriteCollectionRepository.existsByCustomerIdAndCollectionId(uuid, collectionId);
    }
}
