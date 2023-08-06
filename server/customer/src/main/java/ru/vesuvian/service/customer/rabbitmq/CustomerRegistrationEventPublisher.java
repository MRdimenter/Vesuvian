package ru.vesuvian.service.customer.rabbitmq;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.vesuvian.amqp.RabbitMQMessageProducer;
import ru.vesuvian.amqp.message.CustomerUUID;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerRegistrationEventPublisher {
    final RabbitMQMessageProducer rabbitMQMessageProducer;
    @Value("${rabbitmq.exchanges.customer-events}")
    private String customerEventsExchange;

    @Value("${rabbitmq.routing-keys.new-customer-event}")
    private String newCustomerEventRoutingKeys;

    

    /**
     * This method publishes a registration event to RabbitMQ when a new user registers.
     * @param customerUUID
     */
    public void publishRegistrationEvent(String customerUUID) {
        rabbitMQMessageProducer.publish(
                CustomerUUID
                        .builder()
                        .UUID(customerUUID)
                        .build(),
                customerEventsExchange,
                newCustomerEventRoutingKeys);

    }
}
