package ru.vesuvian.collection.service;

import org.springframework.stereotype.Service;
import ru.vesuvian.collection.enums.Privacy;

@Service
public class PrivacyService {

    /**
     * Checks if the collection is visible based on the provided privacy setting.
     *
     * @param privacy The desired privacy setting (ALL, PUBLIC, or PRIVATE).
     * @param value   The current visibility status of the collection (true for PUBLIC, false for PRIVATE).
     * @return Returns true if the collection is visible based on the given privacy setting, false otherwise.
     */
    public boolean isCollectionVisibleBasedOnPrivacy(Privacy privacy, boolean value) {
        return switch (privacy) {
            case ALL -> true;
            case PUBLIC -> value;
            case PRIVATE -> !value;
        };
    }
}
