package ru.vesuvian.collection.service.card;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.dto.get.CardListGetDto;
import ru.vesuvian.collection.dto.update.CardUpdateDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.exception.CardNotFoundException;
import ru.vesuvian.collection.exception.CollectionNotFoundException;
import ru.vesuvian.collection.mapping.create.CollectionCreateMapper;
import ru.vesuvian.collection.mapping.get.CardGetMapper;
import ru.vesuvian.collection.mapping.get.CardListGetDtoMapper;
import ru.vesuvian.collection.mapping.update.CardUpdateMapper;
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
    private final CollectionCreateMapper collectionCreateMapper;
    private final CardUpdateMapper cardUpdateMapper;
    private final CardListGetDtoMapper cardListGetDtoMapper;

    public CardListGetDto getCardsByCollectionId(Long collectionId) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var cardList = retrieveCardsByCollectionIdAndCustomerId(collectionId, uuid);
        var cardDtoList = cardList.stream()
                .map(card -> cardGetMapper.mapCardToDto(card, collectionId))
                .toList();

        return cardListGetDtoMapper.mapToDto(collectionId, cardDtoList);
    }

    @Transactional()
    public void createCardByCollectionId(Long collectionId, CardCreateDto cardCreateDto) {
        var uuid = authenticatedCustomerResolver.getAuthenticatedUUID();
        var collection = collectionAccessService.findCollection(collectionId, uuid);
        var card = collectionCreateMapper.toCardEntity(cardCreateDto);

        collection.incrementNumberOfCards();

        card.setCollection(collection);
        cardRepository.save(card);
    }

    @Transactional
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


    @Transactional
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

    private List<Card> retrieveCardsByCollectionIdAndCustomerId(Long collectionId, UUID customerId) {
        return cardRepository.findCardsByCollectionIdAndCustomerIdOrderByOrderNumber(collectionId, customerId)
                .orElseThrow(
                        () -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found")
                );
    }
}
