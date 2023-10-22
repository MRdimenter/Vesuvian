package ru.vesuvian.collection.mapping.update;

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

@Slf4j
@Component
public class CollectionUpdateMapper {

    public void updateCollection(Collection collection, CollectionUpdateDto updateDto) {
        if (collection == null || updateDto == null) {
            log.warn("Collection or CollectionUpdateDto is null. No update is performed.");
            return;
        }

        collection.setCollectionName(updateDto.getCollectionName() != null ? updateDto.getCollectionName() : collection.getCollectionName());
        collection.setIsPublic(updateDto.getIsPublic() != null ? updateDto.getIsPublic() : collection.getIsPublic());
        collection.setDescription(updateDto.getDescription() != null ? updateDto.getDescription() : collection.getDescription());

        collection.setModifiedDateToNow();
    }
}