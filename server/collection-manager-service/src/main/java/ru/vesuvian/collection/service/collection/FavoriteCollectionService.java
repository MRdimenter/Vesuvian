package ru.vesuvian.collection.service.collection;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.CollectionDto;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CustomerFavoriteCollection;
import ru.vesuvian.collection.exception.collection.CollectionAlreadyFavoriteException;
import ru.vesuvian.collection.repository.CustomerFavoriteCollectionRepository;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoriteCollectionService {
    private final CustomerFavoriteCollectionRepository customerFavoriteCollectionRepository;

    public void handleFavoriteStatusUpdate(UUID uuid, Collection collection, CollectionDto collectionDto, boolean isNewCollection) {
        var isFavorite = collectionDto.getIsFavorite();

        if (isFavorite == null) {
            return;
        }

        if (!isFavorite) {
            if (isNewCollection) return;
            delete(uuid, collection.getId());
            return;
        }

        addCollectionToFavoritesIfAbsent(uuid, collection);
    }

    private void save(UUID uuid, Collection collection) {
        CustomerFavoriteCollection customerFavoriteCollection = CustomerFavoriteCollection.builder()
                .customerId(uuid)
                .collection(collection)
                .build();

        customerFavoriteCollectionRepository.save(customerFavoriteCollection);
    }

    public void delete(UUID uuid, Long collectionId) {
        customerFavoriteCollectionRepository.deleteByCustomerIdAndCollectionId(uuid, collectionId);
    }

    private void addCollectionToFavoritesIfAbsent(UUID uuid, Collection collection) {
        Long collectionId = collection.getId();
        if (!isCollectionFavorite(uuid, collectionId)) {
            save(uuid, collection);
        } else {
            throw new CollectionAlreadyFavoriteException("The collection is already in your favorites");
        }
    }

    public Set<Long> getCollectionIds(UUID uuid) {
        return new HashSet<>(customerFavoriteCollectionRepository.findFavoriteCollectionIdsByCustomerId(uuid));
    }

    public boolean isCollectionFavorite(UUID uuid, Long collectionId) {
        return customerFavoriteCollectionRepository.existsByCustomerIdAndCollectionId(uuid, collectionId);
    }
}
