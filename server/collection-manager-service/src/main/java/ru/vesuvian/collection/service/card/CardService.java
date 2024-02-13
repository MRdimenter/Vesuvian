package ru.vesuvian.collection.service.card;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.card.CardCreateDto;
import ru.vesuvian.collection.dto.card.CardListGetDto;
import ru.vesuvian.collection.dto.card.CardUpdateDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.exception.card.CardNotFoundException;
import ru.vesuvian.collection.exception.collection.CollectionNotFoundException;
import ru.vesuvian.collection.mapping.card.CardCreateMapper;
import ru.vesuvian.collection.mapping.card.CardGetMapper;
import ru.vesuvian.collection.mapping.card.CardListGetDtoMapper;
import ru.vesuvian.collection.mapping.card.CardUpdateMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;
import ru.vesuvian.collection.service.collection.CollectionAccessService;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    private final CardGetMapper cardGetMapper;
    private final AuthenticatedCustomerResolver authenticatedCustomerResolver;
    private final CollectionAccessService collectionAccessService;
    private final CardUpdateMapper cardUpdateMapper;
    private final CardListGetDtoMapper cardListGetDtoMapper;
    private final CardCreateMapper cardCreateMapper;

    public CardListGetDto getCardsByCollectionId(Long collectionId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var cardList = findCardsByCollectionIdAndCustomerId(collectionId, uuid);
        var cardDtoList = cardList.stream()
                .map(card -> cardGetMapper.mapCardToDto(card, collectionId))
                .toList();

        return cardListGetDtoMapper.mapToDto(collectionId, cardDtoList);
    }

    @Transactional()
    public void createCardByCollectionId(Long collectionId, CardCreateDto cardCreateDto) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollection(collectionId, uuid);
        var card = cardCreateMapper.toCardEntity(cardCreateDto);

        collection.incrementNumberOfCards();

        card.setCollection(collection);
        cardRepository.save(card);
    }

    @Transactional()
    public void updateCardByCollectionIdAndCardId(Long collectionId, Long cardId, CardUpdateDto cardUpdateDto) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollectionWithCard(collectionId, uuid, cardId);
        var card = collection.getCards().stream()
                .findFirst()
                .orElseThrow(
                        () -> new CardNotFoundException("Card with ID " + cardId + " not found")
                );

        cardUpdateMapper.updateCard(card, cardUpdateDto);
        card.setCollection(collection);

        cardRepository.save(card);
    }


    @Transactional()
    public void deleteCardByCollectionIdAndCardId(Long collectionId, Long cardId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollectionWithCard(collectionId, uuid, cardId);
        var card = collection.getCards().stream()
                .findFirst()
                .orElseThrow(
                        () -> new CardNotFoundException("Card with ID " + cardId + " not found")
                );

        collection.decrementNumberOfCards();

        collection.getCards().remove(card);
        card.setCollection(collection);
    }
    
    private List<Card> findCardsByCollectionIdAndCustomerId(Long collectionId, UUID customerId) {
        var cards = cardRepository.findCardsByCollectionIdAndCustomerId(collectionId, customerId);
        if (cards.isEmpty()) {
            throw new CollectionNotFoundException("Collection with ID " + collectionId + " not found");
        }
        return cards;
    }
}
