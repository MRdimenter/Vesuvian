package ru.vesuvian.collection.mapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.dto.create.CollectionCreateDto;
import ru.vesuvian.collection.dto.update.CollectionUpdateDto;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CollectionTag;
import ru.vesuvian.collection.entity.Tag;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class CollectionUpdateMapper {

    public void copyAttributes(Collection collection, CollectionUpdateDto updateDto) {
        if (collection != null && updateDto != null) {
            if (updateDto.getCollectionName() != null) {
                collection.setCollectionName(updateDto.getCollectionName());
            }
            if (updateDto.getIsPublic() != null) {
                collection.setIsPublic(updateDto.getIsPublic());
            }
            if (updateDto.getDescription() != null) {
                collection.setDescription(updateDto.getDescription());
            }

            collection.setModifiedDateToNow();
        }
    }
}
