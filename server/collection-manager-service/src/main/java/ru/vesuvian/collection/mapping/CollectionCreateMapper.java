package ru.vesuvian.collection.mapping;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CollectionCreateDTO;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.dto.create.CardCreateDTO;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CollectionCreateMapper {
    public Collection toEntity(CollectionCreateDTO collectionDto, String customerUUID) {
        if (collectionDto == null) {
            return null;
        }

        Collection collection = new Collection();
        collection.setCreatorCustomerId(customerUUID);
        collection.setCollectionName(collectionDto.getCollectionName());
        collection.setIsPublic(collectionDto.getIsPublic());
        collection.setDescription(collectionDto.getDescription());
        collection.setNumberOfCards((collectionDto.getCards() != null) ? collectionDto.getCards().size() : 0);

        // Если в DTO есть карточки, тогда маппим их и устанавливаем их коллекции
        if (collectionDto.getCards() != null && !collectionDto.getCards().isEmpty()) {
            Set<Card> cards = collectionDto.getCards().stream().map(cardDto -> {
                Card card = toCardEntity(cardDto);
                card.setCollection(collection); // Устанавливаем ссылку на коллекцию для каждой карточки
                return card;
            }).collect(Collectors.toSet());
            collection.setCards(cards);
        }

        return collection;
    }

    private Card toCardEntity(CardCreateDTO dto) {
        Card card = new Card();
        card.setTerm(dto.getTerm());
        card.setDefinition(dto.getDefinition());
        card.setHint(dto.getHint());
        card.setImageURL(dto.getImageURL());

        return card;
    }


}
