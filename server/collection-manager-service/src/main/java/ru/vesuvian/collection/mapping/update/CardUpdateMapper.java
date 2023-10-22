package ru.vesuvian.collection.mapping.update;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.update.CardUpdateDto;
import ru.vesuvian.collection.entity.Card;

import java.time.Clock;
import java.time.LocalDateTime;

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
        card.setModifiedDate(LocalDateTime.now(Clock.systemDefaultZone()));
    }
}