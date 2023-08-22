package ru.vesuvian.collection.mapping;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.entity.Card;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CardGetMapper {

    public CardGetDto mapCardsToDto(Card card) {
        return CardGetDto.builder()
                .cardId(card.getCardId())
                .creationDate(card.getCreationDate())
                .term(card.getTerm())
                .hint(card.getHint())
                .imageURL(card.getImageURL())
                .modifiedDate(card.getModifiedDate())
                .definition(card.getDefinition())
                .build();
    }


}
