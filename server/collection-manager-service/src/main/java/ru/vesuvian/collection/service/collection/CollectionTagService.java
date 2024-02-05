package ru.vesuvian.collection.service.collection;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.vesuvian.collection.entity.Collection;
import ru.vesuvian.collection.entity.CollectionTag;
import ru.vesuvian.collection.entity.Tag;

@Service
@RequiredArgsConstructor
@Slf4j
public class CollectionTagService {

    public CollectionTag createCollectionTag(Collection collection, Tag tag) {
        return CollectionTag.builder()
                .collection(collection)
                .tag(tag)
                .build();
    }
}
