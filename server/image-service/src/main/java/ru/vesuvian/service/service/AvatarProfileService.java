package ru.vesuvian.service.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AvatarProfileService {

    public void createDefaultAvatar(String UUID) {
        log.info("Created default avatar for customer {}", UUID);
    }

}
