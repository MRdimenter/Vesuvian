package ru.vesuvian.collection.mapping.get;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.entity.Card;

@Component
@Slf4j
@RequiredArgsConstructor
public class CardGetMapper {

    public CardGetDto mapCardToDto(Card card, Long collectionId) {
        return CardGetDto.builder()
                .collectionID(collectionId)
                .cardId(card.getId())
                .creationDate(card.getCreated_at())
                .term(card.getTerm())
                .hint(card.getHint())
                .imageURL(card.getImageURL())
                .modifiedDate(card.getUpdated_at())
                .definition(card.getDefinition())
                .orderNumber(card.getOrderNumber())
                .build();
    }


}
