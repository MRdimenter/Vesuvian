package ru.vesuvian.collection.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.dto.update.CardUpdateDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.exception.CardNotFoundException;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.mapping.get.CardGetMapper;
import ru.vesuvian.collection.mapping.update.CardUpdateMapper;
import ru.vesuvian.collection.mapping.create.CollectionCreateMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor

public class CardService {
    private final CardRepository cardRepository;
    private final CardGetMapper cardGetMapper;
    private final AuthenticatedCustomerResolver authenticatedCustomerResolver;
    private final CollectionAccessService collectionAccessService;
    private final CollectionCreateMapper collectionCreateMapper;
    private final CardUpdateMapper cardUpdateMapper;

    public List<CardGetDto> getCardsByCollectionId(Long collectionId) {
        var customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var cardList = retrieveCardsByCollectionIdAndCustomerId(collectionId, customerId);
        return cardList.stream()
                .map(card -> cardGetMapper.mapCardToDto(card, collectionId))
                .toList();
    }

    @Transactional()
    public void createCardByCollectionId(Long collectionId, CardCreateDto cardCreateDto) {
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollectionByCustomerIdAndUUID(collectionId, customerId);
        var card = collectionCreateMapper.toCardEntity(cardCreateDto);

        collection.incrementNumberOfCards();
        collection.setModifiedDateToNow();

        card.setCollection(collection);
        cardRepository.save(card);
    }

    public void updateCardByCollectionId(Long collectionId, Long cardId, CardUpdateDto cardUpdateDto) {
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();

        var card = retrieveCardByCollectionIdAndCustomerIdAndCardId(collectionId, customerId, cardId);
        cardUpdateMapper.updateCard(card, cardUpdateDto);
        cardRepository.save(card);
    }

    private List<Card> retrieveCardsByCollectionIdAndCustomerId(Long collectionId, String customerId) {
        return cardRepository.findCardsByCollectionIdAndCustomerId(collectionId, customerId)
                .orElseThrow(
                        () -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found")
                );
    }

    private Card retrieveCardByCollectionIdAndCustomerIdAndCardId(Long collectionId, String customerId, Long cardId) {
        return cardRepository.findCardByCollectionIdAndCustomerIdAndCardId(collectionId, customerId, cardId)
                .orElseThrow(
                        () -> new CardNotFoundException("Card with ID " + cardId + " not found")
                );

    }

}
