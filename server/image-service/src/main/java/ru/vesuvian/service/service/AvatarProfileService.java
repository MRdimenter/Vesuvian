package ru.vesuvian.service.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import ru.vesuvian.service.amazons3.AmazonS3AvatarManager;
import ru.vesuvian.service.entity.CustomerAvatar;
import ru.vesuvian.service.repository.CustomerAvatarRepository;

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
        String urlAvatarPath = customerAvatarRepository.findAvatarUrlByCustomerUUID(customerUUID).get();
        return amazonS3AvatarManager.getCustomerAvatarByPath(urlAvatarPath);
    }

}
