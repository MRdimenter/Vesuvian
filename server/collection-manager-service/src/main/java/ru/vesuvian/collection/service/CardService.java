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
import ru.vesuvian.collection.mapping.CardGetMapper;
import ru.vesuvian.collection.mapping.CollectionCreateMapper;
import ru.vesuvian.collection.repository.CardRepository;
import ru.vesuvian.collection.repository.CollectionRepository;
import ru.vesuvian.collection.security.AuthenticatedCustomerResolver;

import javax.ws.rs.NotFoundException;
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
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();
        List<Card> cardList = cardRepository
                .findCardsByCollectionIdAndCustomerId(collectionId, customerId)
                .orElseThrow(NotFoundException::new); //todo добавить необходимое исключение

        return cardList.stream()
                .map(cardGetMapper::mapCardsToDto)
                .collect(Collectors.toList());
    }


    //todo подумать над тем как можно оптимизировать данные метод, рефакторинг
    @Transactional
    public void createCardByCollectionId(Long collectionId, CardCreateDto cardCreateDto) {
        String customerId = authenticatedCustomerResolver.getAuthenticatedCustomerId();

        //todo добавить корректные исключения
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        // Проверить, является ли пользователь создателем коллекции
        //todo добавить корректные исключения
        if (!collection.getCreatorCustomerId().equals(customerId)) {
            throw new RuntimeException("The customer does not have permission to add cards to this collection");
        }

        Card card = collectionCreateMapper.toCardEntity(cardCreateDto);

        card.setCollection(collection);
        cardRepository.save(card);
    }



}
