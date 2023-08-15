package ru.vesuvian.collection.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.collection.dto.create.CollectionCreateDTO;
import ru.vesuvian.collection.dto.get.CollectionGetDTO;
import ru.vesuvian.collection.enums.Privacy;
import ru.vesuvian.collection.service.CollectionService;

import java.util.List;

@RestController
@RequestMapping("api/v1/collections")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CollectionController {
    final CollectionService collectionService;

    @PostMapping("/create")
    public void createCollection(@RequestBody CollectionCreateDTO newCollection) {
        collectionService.createCollection(newCollection);
    }

    // Получить все коллекции по customer ID
    @GetMapping
    public List<CollectionGetDTO> getCollectionsByCustomerId(
            @RequestParam String customerId,
            @RequestParam(required = false, defaultValue = "ALL") Privacy privacy
            ) {

        log.info("Privacy: {}", privacy);
        return collectionService.getCollectionsByCustomerId(customerId, privacy);
    }

    // Получить коллекцию пользователя по collection ID
    @GetMapping("/{collectionId}")
    public CollectionGetDTO getCollectionByCollectionId(@PathVariable Long collectionId) {
        return collectionService.getCustomerCollectionByCollectionId(collectionId);
    }
}
