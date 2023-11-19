package ru.vesuvian.collection.service.card;

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
import ru.vesuvian.collection.mapping.create.CollectionCreateMapper;
import ru.vesuvian.collection.mapping.get.CardGetMapper;
import ru.vesuvian.collection.mapping.update.CardUpdateMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;
import ru.vesuvian.collection.service.collection.CollectionAccessService;

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
        var UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var cardList = retrieveCardsByCollectionIdAndCustomerId(collectionId, UUID);
        return cardList.stream()
                .map(card -> cardGetMapper.mapCardToDto(card, collectionId))
                .toList();
    }

    @Transactional()
    public void createCardByCollectionId(Long collectionId, CardCreateDto cardCreateDto) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollection(collectionId, UUID);
        var card = collectionCreateMapper.toCardEntity(cardCreateDto);

        collection.incrementNumberOfCards();
        collection.updateModifiedDate();

        card.setCollection(collection);
        cardRepository.save(card);
    }

    @Transactional
    public void updateCardByCollectionIdAndCardId(Long collectionId, Long cardId, CardUpdateDto cardUpdateDto) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollectionWithCard(collectionId, UUID, cardId);
        var card = collection.getCards().stream()
                .findFirst()
                .orElseThrow(
                        () -> new CardNotFoundException("Card with ID " + cardId + " not found")
                );

        cardUpdateMapper.updateCard(card, cardUpdateDto);
        collection.updateModifiedDate();
        card.setCollection(collection);

        cardRepository.save(card);
    }


    @Transactional
    public void deleteCardByCollectionIdAndCardId(Long collectionId, Long cardId) {
        String UUID = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        var collection = collectionAccessService.findCollectionWithCard(collectionId, UUID, cardId);
        var card = collection.getCards().stream()
                .findFirst()
                .orElseThrow(
                        () -> new CardNotFoundException("Card with ID " + cardId + " not found")
                );

        collection.decrementNumberOfCards();
        collection.updateModifiedDate();

        collection.getCards().remove(card);
        card.setCollection(collection);
    }

    private List<Card> retrieveCardsByCollectionIdAndCustomerId(Long collectionId, String customerId) {
        return cardRepository.findCardsByCollectionIdAndCustomerIdOrderByOrderNumber(collectionId, customerId)
                .orElseThrow(
                        () -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found")
                );
    }
}
