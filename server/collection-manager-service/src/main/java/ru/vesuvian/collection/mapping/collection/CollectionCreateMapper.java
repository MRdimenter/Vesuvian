package ru.vesuvian.collection.mapping.collection;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.collection.CollectionCreateDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.mapping.card.CardCreateMapper;
import ru.vesuvian.collection.mapping.tag.TagCreateMapper;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class CollectionCreateMapper {
    private final CardCreateMapper cardCreateMapper;
    private final TagCreateMapper tagCreateMapper;

    public Collection toEntity(CollectionCreateDto collectionDto, UUID customerUUID) {
        if (collectionDto == null) {
            return null;
        }

        var collection = Collection.builder()
                .creatorCustomerId(customerUUID)
                .name(collectionDto.getCollectionName())
                .isPublic(collectionDto.getIsPublic())
                .description(collectionDto.getDescription())
                .numberOfCards((collectionDto.getCards() != null) ? collectionDto.getCards().size() : 0)
                .build();

        // Если в DTO есть карточки, тогда маппим их и устанавливаем их коллекции
        if (collectionDto.getCards() != null && !collectionDto.getCards().isEmpty()) {
            Set<Card> cards = collectionDto.getCards().stream().map(cardDto -> {
                var card = cardCreateMapper.toCardEntity(cardDto);
                card.setCollection(collection); // Устанавливаем ссылку на коллекцию для каждой карточки
                return card;
            }).collect(Collectors.toSet());
            collection.setCards(cards);
        }

        // Обработка тегов
        tagCreateMapper.addTagsToCollectionEntity(collection, collectionDto);

        return collection;
    }

}
