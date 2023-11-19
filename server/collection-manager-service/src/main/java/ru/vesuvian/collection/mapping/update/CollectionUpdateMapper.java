package ru.vesuvian.collection.mapping.update;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.update.CollectionUpdateDto;
import ru.vesuvian.collection.entity.Collection;

@Slf4j
@Component
public class CollectionUpdateMapper {
    public void updateCollection(Collection collection, CollectionUpdateDto updateDto) {
        if (collection == null || updateDto == null) {
            log.warn("Collection or CollectionUpdateDto is null. No update is performed.");
            return;
        }

        collection.setName(updateDto.getCollectionName() != null ? updateDto.getCollectionName() : collection.getName());
        collection.setIsPublic(updateDto.getIsPublic() != null ? updateDto.getIsPublic() : collection.getIsPublic());
        collection.setDescription(updateDto.getDescription() != null ? updateDto.getDescription() : collection.getDescription());
    }
}