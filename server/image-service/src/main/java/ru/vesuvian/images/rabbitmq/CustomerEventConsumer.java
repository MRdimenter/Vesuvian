package ru.vesuvian.images.rabbitmq;

import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import ru.vesuvian.amqp.message.CustomerUUID;
import ru.vesuvian.images.service.AvatarProfileService;

@Component
@AllArgsConstructor
public class CustomerEventConsumer {
    private final AvatarProfileService avatarProfileService;

    @RabbitListener(queues = "${rabbitmq.queues.image-service-new-customer}")
    public void handleNewCustomerEvent(CustomerUUID customerUUID) {
        avatarProfileService.createDefaultRandomAvatar(customerUUID.getUUID());
    }
}
