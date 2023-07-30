package ru.vesuvian.service.rabbitmq;

import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.service.AvatarProfileService;

@Component
@AllArgsConstructor
public class ImageConsumer {
    private final AvatarProfileService avatarProfileService;

    @RabbitListener(queues = "${rabbitmq.queues.image-service-new-customer}")
    public void consumer(String UUID) {
        avatarProfileService.createDefaultAvatar(UUID);
    }
}
