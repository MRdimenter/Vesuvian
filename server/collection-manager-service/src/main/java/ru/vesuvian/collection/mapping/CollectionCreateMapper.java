package ru.vesuvian.collection.mapping;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CollectionCreateDto;
import ru.vesuvian.collection.dto.create.TagCreateDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.dto.create.CardCreateDto;
import ru.vesuvian.collection.entity.CollectionTag;
import ru.vesuvian.collection.entity.Tag;
import ru.vesuvian.collection.repository.TagRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class CollectionCreateMapper {
    private final TagRepository tagRepository;

    public Collection toEntity(CollectionCreateDto collectionDto, String customerUUID) {
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

        // Обработка тегов
        if (collectionDto.getTags() != null && !collectionDto.getTags().isEmpty()) {
            Set<Tag> tags = collectionDto.getTags().stream()
                    .map(this::toTagEntity)
                    .collect(Collectors.toSet());

            Set<CollectionTag> collectionTags = tags.stream().map(tag -> {
                CollectionTag collectionTag = new CollectionTag();
                collectionTag.setCollection(collection);
                collectionTag.setTag(tag);
                return collectionTag;
            }).collect(Collectors.toSet());

            collection.setCollectionTags(collectionTags);
        }

        return collection;
    }

    public Card toCardEntity(CardCreateDto dto) {
        Card card = new Card();
        card.setTerm(dto.getTerm());
        card.setDefinition(dto.getDefinition());
        card.setHint(dto.getHint());
        card.setImageURL(dto.getImageURL());

        return card;
    }

    public Tag toTagEntity(TagCreateDto dto) {
        return tagRepository.findByNameExcludingCollections(dto.getTagName()).orElseGet(() -> {
            Tag newTag = new Tag();
            newTag.setTagName(dto.getTagName());
            return tagRepository.save(newTag);
        });
    }

}
