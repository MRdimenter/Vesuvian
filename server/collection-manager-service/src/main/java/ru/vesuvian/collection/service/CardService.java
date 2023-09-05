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

import java.time.LocalDateTime;
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
        var collection = collectionAccessService.findMyCollectionByIdAndCustomerId(collectionId, customerId);
        var card = collectionCreateMapper.toCardEntity(cardCreateDto);

        collection.incrementNumberOfCards();
        collection.setModifiedDateToNow();

        card.setCollection(collection);
        cardRepository.save(card);
    }

    private List<Card> retrieveCardsByCollectionIdAndCustomerId(Long collectionId, String customerId) {
        return cardRepository.findCardsByCollectionIdAndCustomerId(collectionId, customerId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection with ID " + collectionId + " not found"));
    }


}
