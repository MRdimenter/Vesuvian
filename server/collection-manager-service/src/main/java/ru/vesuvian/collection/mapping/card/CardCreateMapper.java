package ru.vesuvian.collection.mapping.card;

import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.card.CardCreateDto;
import ru.vesuvian.collection.entity.Card;

@Component
public class CardCreateMapper {
    public Card toCardEntity(CardCreateDto dto) {
        return Card.builder()
                .term(dto.getTerm())
                .definition(dto.getDefinition())
                .hint(dto.getHint())
                .imageURL(dto.getImageURL())
                .build();
    }
}
