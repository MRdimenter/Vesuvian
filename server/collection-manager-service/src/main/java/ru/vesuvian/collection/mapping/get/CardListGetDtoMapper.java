package ru.vesuvian.collection.mapping.get;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.get.CardGetDto;
import ru.vesuvian.collection.dto.get.CardListGetDto;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class CardListGetDtoMapper {

    public CardListGetDto mapToDto(Long collectionId, List<CardGetDto> cardDtoList) {
        return CardListGetDto.builder()
                .collectionId(collectionId)
                .cards(cardDtoList)
                .build();
    }
}
