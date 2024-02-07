package ru.vesuvian.collection.mapping.card;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.card.CardUpdateDto;
import ru.vesuvian.collection.entity.Card;

@Slf4j
@Component
public class CardUpdateMapper {

    public void updateCard(Card card, CardUpdateDto cardUpdateDto) {
        if (card == null || cardUpdateDto == null) {
            log.warn("Card or CardUpdateDto is null. No update is performed.");
            return;
        }

        card.setDefinition(cardUpdateDto.getDefinition() != null ? cardUpdateDto.getDefinition() : card.getDefinition());
        card.setTerm(cardUpdateDto.getTerm() != null ? cardUpdateDto.getTerm() : card.getTerm());
        card.setHint(cardUpdateDto.getHint() != null ? cardUpdateDto.getHint() : card.getHint());
    }
}