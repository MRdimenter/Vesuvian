package ru.vesuvian.collection.mapping.tag;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.tag.TagGetDto;
import ru.vesuvian.collection.entity.Tag;

@Component
@Slf4j
@RequiredArgsConstructor
public class TagGetMapper {

    public TagGetDto mapTagToDto(Tag tag, Long collectionId) {
        return TagGetDto.builder()
                .collectionId(collectionId)
                .tagId(tag.getId())
                .tagName(tag.getName())
                .build();
    }
}
