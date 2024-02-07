package ru.vesuvian.collection.mapping.collection;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vesuvian.collection.dto.card.CollectionUpdateDto;
import ru.vesuvian.collection.entity.Collection;

@Slf4j
@Component
public class CollectionUpdateMapper {

    public void updateCollectionForPut(Collection collection, CollectionUpdateDto updateDto) {
        if (collection == null || updateDto == null) {
            log.warn("Collection or CollectionUpdateDto is null. No update is performed.");
            return;
        }

        collection.setName(updateDto.getCollectionName() != null ? updateDto.getCollectionName() : collection.getName());
        collection.setIsPublic(updateDto.getIsPublic() != null ? updateDto.getIsPublic() : collection.getIsPublic());
        collection.setDescription(updateDto.getDescription() != null ? updateDto.getDescription() : collection.getDescription());
    }

    public void updateCollectionForPatch(Collection collection, CollectionUpdateDto updateDto) {
        if (collection == null || updateDto == null) {
            log.warn("Collection or CollectionUpdateDto is null. No update is performed.");
            return;
        }

        if (updateDto.getCollectionName() != null) {
            collection.setName(updateDto.getCollectionName());
        }
        if (updateDto.getIsPublic() != null) {
            collection.setIsPublic(updateDto.getIsPublic());
        }
        if (updateDto.getDescription() != null) {
            collection.setDescription(updateDto.getDescription());
        }
    }
}
