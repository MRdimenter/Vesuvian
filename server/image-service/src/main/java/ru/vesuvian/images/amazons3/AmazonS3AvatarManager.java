package ru.vesuvian.images.amazons3;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Component
public class AmazonS3AvatarManager {
    final AmazonS3Manager amazonS3Manager;

    public String getRandomAvatarUrl() {
        List<String> avatarKeys = amazonS3Manager.getListObjectsInFolder("customers/avatars");
        if (avatarKeys.isEmpty()) {
            throw new IllegalStateException("No avatars available in the storage");
        }

        String randomKey = avatarKeys.get(new Random().nextInt(avatarKeys.size()));
        log.info("get random avatar url: " + String.format("%s/customers/avatars/%s", amazonS3Manager.getBucketName(), randomKey));
        return randomKey;
    }

    public Resource getCustomerAvatarByPath(String path) {
        return amazonS3Manager.getElementByPath(path);
    }
}
