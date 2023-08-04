package ru.vesuvian.images.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import ru.vesuvian.images.amazons3.AmazonS3AvatarManager;
import ru.vesuvian.images.exception.ResourceNotFoundException;
import ru.vesuvian.images.repository.CustomerAvatarRepository;
import ru.vesuvian.images.entity.CustomerAvatar;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AvatarProfileService {
    final CustomerAvatarRepository customerAvatarRepository;
    final AmazonS3AvatarManager amazonS3AvatarManager;

    public void createDefaultRandomAvatar(String customerId) {
        customerAvatarRepository.save(
                CustomerAvatar.builder()
                        .customerUUID(customerId)
                        .defaultAvatarURL(amazonS3AvatarManager.getRandomAvatarUrl())
                        .build()
        );

        log.info("Created default avatar for customer {}", customerId);
    }

    public Resource getCustomerAvatarByCustomerUUID(String customerUUID) {
        Optional<String> optionalUrlAvatarPath = customerAvatarRepository.findAvatarUrlByCustomerUUID(customerUUID);

        if (optionalUrlAvatarPath.isEmpty()) {
            throw new ResourceNotFoundException("Customer avatar not found for customer UUID: " + customerUUID);
        }

        return amazonS3AvatarManager.getCustomerAvatarByPath(optionalUrlAvatarPath.get());
    }

}
