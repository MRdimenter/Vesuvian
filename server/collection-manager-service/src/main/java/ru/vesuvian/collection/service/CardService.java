package ru.vesuvian.collection.service;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.exception.UnauthorizedAccessException;
import ru.vesuvian.collection.mapping.CardGetMapper;
import ru.vesuvian.collection.mapping.CollectionCreateMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;

import javax.ws.rs.NotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CardService {
    final CardRepository cardRepository;
    final CardGetMapper cardGetMapper;
    final AuthenticatedCustomerResolver authenticatedCustomerResolver;
    final CollectionRepository collectionRepository;
    final CollectionCreateMapper collectionCreateMapper;

    public List<CardGetDto> getCardsByCollectionId(Long collectionId) {
        var customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var cardList = retrieveCardsByCollectionIdAndCustomerId(collectionId, customerId);
        return cardList.stream()
                .map(cardGetMapper::mapCardsToDto)
                .toList();
    }

    @Transactional()
    public void createCardByCollectionId(Long collectionId, CardCreateDto cardCreateDto) {
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = findCollectionByIdAndCustomerId(collectionId, customerId);
        var card = collectionCreateMapper.toCardEntity(cardCreateDto);
        updateCollectionDetails(collection);
        card.setCollection(collection);
        cardRepository.save(card);
    }

    private List<Card> retrieveCardsByCollectionIdAndCustomerId(Long collectionId, String customerId) {
        return cardRepository.findCardsByCollectionIdAndCustomerId(collectionId, customerId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }

    private Collection findCollectionByIdAndCustomerId(Long collectionId, String customerId) {
        var collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));

        if (!collection.getCreatorCustomerId().equals(customerId)) {
            throw new UnauthorizedAccessException("The customer does not have permission to add cards to this collection");
        }

        return collection;
    }

    private void updateCollectionDetails(Collection collection) {
        collection.setModifiedDate(LocalDateTime.now());
        collection.setNumberOfCards(collection.getNumberOfCards() + 1);
    }


}
